import { useState, useMemo, useEffect } from "react";
import { url } from "../config";
import Alert from "../Components/Alert";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
function History({ mode }: { mode: "user" | "admin" }) {
    const [books, setBooks] = useState<{
        bookid: string,
        isbn: string,
        username: string,
        borrow_date: string,
        returned: boolean,
        name: string
    }[]>([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [searchText, setSearchText] = useState("");
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const username = u === null ? "" : u;
    const booktoshow = mode === "admin" ? books : books.filter(book => book.username === username);
    useEffect(() => {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowHistory"
            })
        })
            .then(res => res.json())
            .then(
                obj => setBooks(obj),
                () => setOpenAlert(true)
            )
    }, []);
    return (
        <Container component="main" maxWidth="lg">
            <Alert
                message="Network error"
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                servrity="error"
            />
            {mode === "admin" && <TextField
                label="Search by user name"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                margin="normal"
                fullWidth
            />}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>User name</TableCell>
                            <TableCell>Borrow Date</TableCell>
                            <TableCell align="right">ISBN</TableCell>
                            <TableCell align="right">Bookid</TableCell>
                            <TableCell align="right">Returned</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booktoshow.filter(book => book.username.includes(searchText)).map((book, index) => (
                            <TableRow key={index}>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.username}</TableCell>
                                <TableCell>{book.borrow_date}</TableCell>
                                <TableCell align="right">{book.isbn}</TableCell>
                                <TableCell align="right">{book.bookid}</TableCell>
                                <TableCell align="right">{book.returned ? "Yes" : "No"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
export default History;