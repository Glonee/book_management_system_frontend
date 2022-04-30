import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CssBaseline,
    Button,
    TextField,
    Select,
    FormControl,
    Container,
    InputLabel,
    MenuItem,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Grid
} from '@mui/material';
import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import { url } from '../config';
const Barcode = lazy(() => import('../Barcode'));
const AddBooks = lazy(() => import('./AddBooks'));
const bookprto = {
    name: "",
    author: "",
    isbn: "",
    publish: "",
    bclass: "",
    num: 0,
    price: 0,
    position: ""
};
type book = typeof bookprto;
function Books({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [select, setSelect] = useState("");
    const [books, setBooks] = useState<book[]>([]);
    const [selectBy, setSelectBy] = useState<keyof book>("name");
    const [searchText, setSearchText] = useState("");
    const [openAddBooks, setOpenAddBooks] = useState(false);
    const [barcode, setBarcode] = useState("");
    const keys = Object.keys(bookprto) as (keyof book)[];
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
        <Container maxWidth="md">
            <CssBaseline />
            {mode === "admin" && <>
                <Button onClick={() => setOpenAddBooks(true)} variant="outlined" fullWidth>Add book</Button>
                <Dialog
                    open={openAddBooks}
                    onClose={() => {
                        setOpenAddBooks(false);
                        setBarcode("");
                    }}
                >
                    <DialogTitle>
                        {barcode === "" ? "Add book" : "Barcode"}
                    </DialogTitle>
                    <DialogContent>
                        <Suspense fallback={<CircularProgress />}>
                            {barcode === "" ?
                                <AddBooks done={id => setBarcode(id)} /> :
                                <Barcode data={barcode} />
                            }
                        </Suspense>
                    </DialogContent>
                </Dialog>
            </>}
            <Grid container spacing={2}>
                <Grid item sm={3} xs={4}>
                    <FormControl
                        fullWidth
                        sx={{ mb: 3, mt: 3 }}
                    >
                        <InputLabel id="cata">Search by</InputLabel>
                        <Select
                            labelId='cata'
                            id="cataselect"
                            label="Search by"
                            value={selectBy}
                            onChange={e => setSelectBy(e.target.value as keyof book)}
                        >
                            {keys.map(value => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={9} xs={8}>
                    <TextField
                        sx={{ mt: 3, mb: 3 }}
                        fullWidth
                        margin="normal"
                        label="Search"
                        type="text"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    ></TextField>
                </Grid>
            </Grid>
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
                        {books.filter(book => book[selectBy].toString().includes(searchText)).map(book => (
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
        </Container>
    )
}
export default Books;