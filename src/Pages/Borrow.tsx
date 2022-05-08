import { Button, CircularProgress, Container, Dialog, DialogContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import Alert from '../Components/Alert';
import { url } from '../config';
const Renew = lazy(() => import('../Components/Renew'));
const Payfine = lazy(() => import('../Components/Payfine'));
const itemprto = {
    bookid: "",
    borrow_date: "",
    deadline: "",
    fine: 0,
    isbn: "",
    name: "",
    username: "",
    time: ""
};
export type borrowitem = typeof itemprto;
function Borrow({ mode }: { mode: "user" | "admin" }) {
    const u = localStorage.getItem(`${mode}name`);
    const [username, setUsername] = useState(mode === "admin" ? "" : (u === null ? "" : u));
    const [borrowed, setBorrowed] = useState<borrowitem[]>([]);
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [openPayFine, setOpenPayFine] = useState(false);
    const [openRenew, setOpenRenew] = useState(false);
    const [selected, setSelected] = useState(itemprto);
    useEffect(() => {
        if (mode === "user") {
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
                    () => setAlertinfo({ open: true, message: "Network error" })
                );
        } else {
            fetch(`${url}/admin`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    action: "getBorrowingListForAdmin"
                })
            })
                .then(res => res.json())
                .then(
                    obj => setBorrowed(obj),
                    () => setAlertinfo({ open: true, message: "Network error" })
                );
        }
    }, [mode]);
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
                () => setAlertinfo({ open: true, message: "Network error" })
            );
    }
    function getall() {
        fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingListForAdmin"
            })
        })
            .then(res => res.json())
            .then(
                obj => setBorrowed(obj),
                () => setAlertinfo({ open: true, message: "Network error" })
            );
    }
    const update = username === "" ? getall : () => updateBowered(username);
    function returnBook(isbn: string, bookid: string, user: string) {
        fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "returnBook",
                isbn: isbn,
                bookid: bookid,
                username: user
            })
        })
            .then(res => res.json())
            .then(
                update,
                () => setAlertinfo({ open: true, message: "Network error" })
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
                        item={selected}
                        done={() => {
                            update();
                            setOpenRenew(false);
                        }}
                    />
                </Suspense>
            </Dialog>
            {mode === "admin" &&
                <Grid container spacing={2}>
                    <Dialog
                        open={openPayFine}
                        onClose={() => {}}
                    >
                        <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                            <Payfine
                                done={() => {
                                    returnBook(selected.isbn, selected.bookid, selected.username);
                                    setOpenPayFine(false);
                                }}
                            />
                        </Suspense>
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
                            onClick={update}
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
                            {mode === "admin" && <TableCell>Username</TableCell>}
                            <TableCell align='right'>Fine</TableCell>
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
                                {mode === "admin" && <TableCell>{book.username}</TableCell>}
                                <TableCell align='right'>{book.fine}</TableCell>
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
                                                setSelected(book);
                                                setOpenPayFine(true);
                                                const payurl = new URL(`${url}/index1.jsp`);
                                                payurl.searchParams.set("bookid", `"${book.bookid}"`);
                                                payurl.searchParams.set("isbn", `"${book.isbn}"`);
                                                payurl.searchParams.set("payFine", `"${book.fine.toString()}"`);
                                                payurl.searchParams.set("name", `"${book.name}"`);
                                                window.open(payurl.href);
                                            } else {
                                                returnBook(book.isbn, book.bookid, book.username)
                                            }
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