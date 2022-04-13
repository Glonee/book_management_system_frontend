import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { url } from '../config';
function Books({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [select, setSelect] = useState("");
    const [books, setBooks] = useState<{
        name: string,
        author: string,
        isbn: string,
        publish: string,
        bclass: string,
        num: number,
        price: number
    }[]>([]);
    const [searchText, setSearchText] = useState("");
    useEffect(updateBooks, []);
    function updateBooks() {
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "listBooks" })
        })
            .then(res => res.json(), err => console.log(err))
            .then(obj => { if (obj !== undefined) { setBooks(obj) } })
    }
    function borrow(isbn: string) {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: localStorage.getItem("username"),
                isbn: isbn,
                num: 1
            })
        }).then(res => res.json(), err => console.log(err))
            .then(obj => {
                if (obj !== undefined && obj.state === 0) {
                    alert("success");
                } else {
                    alert("Fail");
                }
            });
    }
    function deleteBook(isbn: string) {
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "deleteBook", isbn: isbn })
        })
            .then(res => res.json(), err => alert(err))
            .then(obj => {
                if (obj !== undefined && obj.state === 1) {
                    alert("Success");
                    updateBooks();
                } else {
                    alert("Failed")
                }
            })
    }
    return (
        <>
            <CssBaseline />
            <TextField
                margin="normal"
                fullWidth
                label="Search"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            ></TextField>
            <TableContainer sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align='right'>ISBN</TableCell>
                            <TableCell align='right'>Num</TableCell>
                            {mode === "admin" && <TableCell align='right'>Action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.filter(book => book.name.startsWith(searchText)).map(book => (
                            <TableRow
                                key={book.isbn}
                                hover
                                selected={select === book.isbn}
                                onClick={() => setSelect(sec => sec === book.isbn ? "" : book.isbn)}
                            >
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell align='right'>{book.isbn}</TableCell>
                                <TableCell align='right'>{book.num}</TableCell>
                                {mode === "admin" && <TableCell align='right'>
                                    <Button onClick={() => { deleteBook(book.isbn) }}>Delete</Button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
            <Button
                variant='outlined'
                disabled={select === ""}
                onClick={() => borrow(select)}
            >Borrow</Button>
        </>
    )
}
export default Books;