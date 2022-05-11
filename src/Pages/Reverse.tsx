import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import Alert from "../Components/Alert";
import { url } from '../config';
function Reverse({ mode }: { mode: "user" | "admin" }) {
    const [username, setUsername] = useState("");
    const [books, setBooks] = useState<{
        name: string,
        isbn: string,
        username: string,
        reserve_time: string,
        hasbook: boolean
    }[]>([]);
    const [openAlert, setOpenAlert] = useState(false);
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const user = u === null ? "" : u;
    useEffect(() => {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getReserveList",
                username: user
            })
        })
            .then(res => res.json())
            .then(
                obj => setBooks(obj),
                () => setOpenAlert(true)
            )
    }, [user]);
    function search() {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getReverseList",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => setBooks(obj),
                () => setOpenAlert(true)
            )
    }
    return (
        <Container component="main" maxWidth="lg">
            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                message="Network error"
                servrity="error"
            />
            {mode === "admin" && <Grid container spacing={2}>
                <Grid item md={10} xs={8}>
                    <TextField
                        sx={{ mt: 3, mb: 3, height: 55 }}
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        fullWidth
                    />
                </Grid>
                <Grid item md={2} xs={4}>
                    <Button
                        sx={{ mt: 3, mb: 3, height: 55 }}
                        variant="contained"
                        onClick={search}
                        fullWidth
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Reverse time</TableCell>
                            <TableCell>Has book</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
                            <TableRow key={book.isbn}>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.username}</TableCell>
                                <TableCell>{book.reserve_time}</TableCell>
                                <TableCell>{book.hasbook ? "Yes" : "No"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
export default Reverse;