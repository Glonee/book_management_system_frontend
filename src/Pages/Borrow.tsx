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
    const now = new Date();
    const remainings = borrowed.map(value => (new Date(value.deadline).getTime() - now.getTime()));
    useEffect(() => {
        updateBowered();
    }, []);
    function updateBowered() {
        fetch(`${url}/user`, {
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
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "returnBook",
                username: localStorage.getItem("username"),
                isbn: isbn,
                num: 1,
                payFine: 1
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
                            <TableCell>Borrow date</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell align='right'>Fine</TableCell>
                            <TableCell align='right'>Num</TableCell>
                            <TableCell align="right">Remaining days</TableCell>
                            <TableCell>action</TableCell>
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