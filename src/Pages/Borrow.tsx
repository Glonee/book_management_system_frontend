import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Grid, Container, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { url } from '../config';
import Alert from '../Alert';
import code from '../img/code.jpg'
function Borrow({ mode }: { mode: "user" | "admin" }) {
    const [username, setUsername] = useState("");
    const [borrowed, setBorrowed] = useState<{
        bookid: string,
        borrow_date: string,
        deadline: string,
        fine: number,
        isbn: string,
        name: string,
        num: number
    }[]>([]);
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [openPayFine, setOpenPayFine] = useState(false);
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
                obj => setBorrowed(obj),
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                }
            );
    }, []);
    const now = new Date();
    const remainings = borrowed.map(value => (new Date(value.deadline).getTime() - now.getTime()));
    function updateBowered() {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingList",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => setBorrowed(obj),
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
                () => updateBowered(),
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
            {mode === "admin" &&
                <Grid container spacing={2}>
                    <Dialog
                        open={openPayFine}
                        onClose={() => setOpenPayFine(false)}
                    >
                        <DialogTitle>Pay fine with Alipay</DialogTitle>
                        <DialogContent >
                            <img src={code} style={{ height: 370, width: 370 }} />
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
                            onClick={updateBowered}
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
                            {mode === "admin" && <TableCell>action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowed.map((book, index) => (
                            <TableRow
                                key={book.isbn}
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
                                {mode === "admin" && <TableCell>
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