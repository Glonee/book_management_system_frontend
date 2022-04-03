import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline } from '@mui/material';
import { useState } from 'react';
const books = [
    { name: "Hello World", author: "Alex Ander", ISBN: 114514, total: 10, available: 4 },
    { name: "Javascript SUCKS", author: "Bicas Tomas", ISBN: 1919810, total: 7, available: 4 },
    { name: "PHP is the best", author: "Columbia", ISBN: 9876543, total: 3876, available: 4 }
]
function Books() {
    const [selected, setSelected] = useState(0);
    return (
        <>
            <CssBaseline />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align='right'>ISBN</TableCell>
                            <TableCell align='right'>Total</TableCell>
                            <TableCell align='right'>Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
                            <TableRow
                                key={book.ISBN}
                                hover
                                selected={selected === book.ISBN}
                                onClick={() => setSelected(sec => sec === book.ISBN ? 0 : book.ISBN)}
                            >
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell align='right'>{book.ISBN}</TableCell>
                                <TableCell align='right'>{book.total}</TableCell>
                                <TableCell align='right'>{book.available}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >

            </TableContainer>
        </>
    )
}
export default Books;