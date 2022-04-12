import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { url } from '../config';
function Books(): JSX.Element {
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
    useEffect(updateBooks, []);
    function updateBooks() {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "listBooks" })
        })
            .then(res => res.json(), err => console.log(err))
            .then(obj => { if (obj !== undefined) { setBooks(obj) } })
    }
    function borrow(isbn: string) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: localStorage.getItem("username"),
                isbn: isbn,
                num: 1
            })
        }).then(() => updateBooks(), err => console.log(err));
    }
    return (
        <>
            <CssBaseline />
            <TableContainer sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align='right'>ISBN</TableCell>
                            <TableCell align='right'>Num</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
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