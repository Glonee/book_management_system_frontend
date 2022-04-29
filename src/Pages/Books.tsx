import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Button, TextField, Select, FormControl, Container, InputLabel, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { url } from '../config';
function Books({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [select, setSelect] = useState("");
    const [books, setBooks] = useState([{
        name: "abc",
        author: "bcd",
        isbn: "cde",
        publish: "def",
        bclass: "fgh",
        num: 3,
        price: 4,
        position: "haha"
    }]);
    const [selectBy, setSelectBy] = useState<keyof typeof books[0]>("name");
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
            <Container maxWidth="md">
                <FormControl
                    sx={{ mt: 3, mb: 3, mr: 3, width: "20%" }}
                >
                    <InputLabel id="cata">Search by</InputLabel>
                    <Select
                        labelId='cata'
                        id="cataselect"
                        label="Search by"
                        value={selectBy}
                        onChange={e => setSelectBy(e.target.value as "name" | "author" | "isbn" | "publish" | "bclass" | "num" | "price" | "position")}
                    >
                        {Object.keys(books[0]).map(value => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    sx={{ mt: 3, mb: 3, width: "75%" }}
                    margin="normal"
                    label="Search"
                    type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                ></TextField>
            </Container>
            <TableContainer sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell align='right'>ISBN</TableCell>
                            <TableCell align='right'>Num</TableCell>
                            {mode === "admin" && <TableCell align='right'>Action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.filter(book => book[selectBy].toString().startsWith(searchText)).map(book => (
                            <TableRow
                                key={book.isbn}
                                hover
                                selected={select === book.isbn}
                                onClick={() => setSelect(sec => sec === book.isbn ? "" : book.isbn)}
                            >
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.position}</TableCell>
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