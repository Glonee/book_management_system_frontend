import { CssBaseline, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { url } from '../config';
function Borrow() {
    const [borrowed, setBorrowed] = useState<{
        borrow_date: string,
        deadline: string,
        fine: number,
        isbn: string,
        name: string,
        num: number
    }[]>([]);
    useEffect(() => {
        updateBowered();
    }, []);
    function updateBowered() {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingList",
                username: localStorage.getItem("username")
            })
        })
            .then(res => res.json(), err => console.log(err))
            .then(obj => { if (obj !== undefined) { setBorrowed(obj) } });
    }
    function returnBook(isbn: string) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "returnBook",
                username: localStorage.getItem("username"),
                isbn: isbn,
                num: 1,
                payfine: 0
            })
        })
            .then(() => updateBowered(), err => console.log(err));
    }
    return (
        <>
            <CssBaseline />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>borrow_date</TableCell>
                            <TableCell>deadline</TableCell>
                            <TableCell align='right'>fine</TableCell>
                            <TableCell align='right'>num</TableCell>
                            <TableCell>action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowed.map(book => (
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
                                <TableCell><Button onClick={() => returnBook(book.isbn)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </>
    )
}
export default Borrow;