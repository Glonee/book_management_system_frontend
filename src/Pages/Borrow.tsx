import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Grid, Container, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import { url } from '../config';
import Alert from '../Alert';
import code from '../img/code.jpg'
const Renew = lazy(() => import('./Renew'));
export interface borrowitem {
    bookid: string,
    borrow_date: string,
    deadline: string,
    fine: number,
    isbn: string,
    name: string,
    num: number,
    username: string,
}
function Borrow({ mode }: { mode: "user" | "admin" }) {
    const [username, setUsername] = useState("");
    const [borrowed, setBorrowed] = useState<borrowitem[]>([{
        bookid: "123",
        borrow_date: "2022-04-01",
        deadline: "2022-04-11",
        fine: 1,
        isbn: "9787115390592",
        name: "cpp",
        num: 1,
        username: "19040400024"
    }]);
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [openPayFine, setOpenPayFine] = useState(false);
    const [openRenew, setOpenRenew] = useState(false);
    const [selected, setSelected] = useState<borrowitem>();
    useEffect(() => {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingList",
                username: localStorage.getItem("username")
            })
        })
            .then(res => res.json())
            .then(
                obj => setBorrowed(obj.map((value: any) => ({ ...value, username: localStorage.getItem("username") }))),
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                }
            );
    }, []);
    const now = new Date();
    const remainings = borrowed.map(value => (new Date(value.deadline).getTime() - now.getTime()));
    function updateBowered(user: string) {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingList",
                username: user
            })
        })
            .then(res => res.json())
            .then(
                obj => setBorrowed(obj.map((value: any) => ({ ...value, username: user }))),
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                }
            );
    }
    function returnBook(isbn: string, bookid: string) {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "returnBook",
                isbn: isbn,
                bookid: bookid
            })
        })
            .then(res => res.json())
            .then(
                () => updateBowered(username),
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" })
                }
            )
    }
    return (
        <Container component="main" maxWidth="lg">
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity="error"
            />
            <Dialog
                open={openRenew}
                onClose={() => setOpenRenew(false)}
                maxWidth="sm"
                fullWidth
            >
                <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                    <Renew
                        item={selected as borrowitem}
                        done={() => { updateBowered(username); setOpenRenew(false); }}
                    />
                </Suspense>
            </Dialog>
            {mode === "admin" &&
                <Grid container spacing={2}>
                    <Dialog
                        open={openPayFine}
                        onClose={() => setOpenPayFine(false)}
                    >
                        <DialogTitle>Pay fine with Alipay</DialogTitle>
                        <DialogContent >
                            <img alt='' src={code} style={{ height: 370, width: 370 }} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenPayFine(false)}>Done</Button>
                        </DialogActions>
                    </Dialog>
                    <Grid item md={10} xs={8}>
                        <TextField
                            sx={{ mt: 3, mb: 3, height: 55 }}
                            label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            fullWidth
                            margin='normal'
                        />
                    </Grid>
                    <Grid item md={2} xs={4}>
                        <Button
                            variant='contained'
                            sx={{ mt: 3, mb: 3, height: 55 }}
                            fullWidth
                            disabled={username === ""}
                            onClick={() => updateBowered(username)}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            }
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Borrow date</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell align='right'>Fine</TableCell>
                            <TableCell align='right'>Num</TableCell>
                            <TableCell align="right">Remaining days</TableCell>
                            <TableCell align="right">Renew</TableCell>
                            {mode === "admin" && <TableCell>Return</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowed.map((book, index) => (
                            <TableRow
                                key={book.isbn + book.bookid}
                                hover
                            >
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.borrow_date}</TableCell>
                                <TableCell>{book.deadline}</TableCell>
                                <TableCell align='right'>{book.fine}</TableCell>
                                <TableCell align='right'>{book.num}</TableCell>
                                <TableCell align="right">{
                                    remainings[index] > 0 ?
                                        (remainings[index] / 1000 / 60 / 60 / 24).toFixed(0)
                                        : "Over due"
                                }
                                </TableCell>
                                <TableCell align='right'>
                                    <Button
                                        onClick={() => {
                                            setSelected(book);
                                            setOpenRenew(true);
                                        }}
                                    >
                                        Renew
                                    </Button>
                                </TableCell>
                                {mode === "admin" && <TableCell align='right'>
                                    <Button
                                        onClick={() => {
                                            if (book.fine !== 0) {
                                                setOpenPayFine(true);
                                            }
                                            returnBook(book.isbn, book.bookid);
                                        }}
                                    >
                                        Return
                                    </Button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </Container >
    )
}
export default Borrow;