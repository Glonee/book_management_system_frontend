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
    Grid,
    AlertColor
} from '@mui/material';
import { useEffect, useState, lazy, Suspense } from 'react';
import { url } from '../config';
import Alert from '../Alert';
const Barcode = lazy(() => import('../Barcode'));
const AddBooks = lazy(() => import('./AddBooks'));
const BorrowConfirm = lazy(() => import('./BorrowConfirmPage'));
const ModBooks = lazy(() => import('./ModBooks'));
const bookprto = {
    name: "",
    author: "",
    isbn: "",
    publish: "",
    bclass: "",
    num: 0,
    price: 0,
    position: "",
    publish_date: ""
};
export type book = typeof bookprto;
function Books({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [select, setSelect] = useState("");
    const [books, setBooks] = useState<book[]>([{
        "author": "author0",
        bclass: "文学类",
        isbn: "11111111",
        name: "bookname0",
        num: 59,
        position: "101-05-01",
        price: 20,
        publish: "商务印书馆",
        publish_date: "2001-01-01"
    }]);
    const [openBorrow, setOpenBorrow] = useState(false);
    const [selectBy, setSelectBy] = useState<keyof book>("name");
    const [searchText, setSearchText] = useState("");
    const [openAddBooks, setOpenAddBooks] = useState(false);
    const [barcode, setBarcode] = useState("");
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        serivity: AlertColor
    }>({ open: false, message: "", serivity: 'error' });
    const [loading, setLoading] = useState(false);
    const keys = Object.keys(bookprto) as (keyof book)[];
    useEffect(updateBooks, []);
    function updateBooks() {
        setLoading(true);
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "listBooks" })
        })
            .then(res => res.json())
            .then(
                obj => { setBooks(obj); setLoading(false); },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                    setLoading(false);
                }
            )
    }
    function deleteBook(isbn: string) {
        setLoading(true);
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "deleteBook", isbn: isbn })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 1) {
                        setAlertinfo({ open: true, message: "Success", serivity: 'success' });
                        updateBooks();
                    } else {
                        setAlertinfo({ open: true, message: "Fail", serivity: "error" });
                    }
                    setLoading(false);
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                    setLoading(false);
                }
            )
    }
    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity={alertinfo.serivity}
            />
            <Dialog
                open={barcode !== ""}
                onClose={() => setBarcode("")}
            >
                <DialogTitle>Barcode</DialogTitle>
                <DialogContent>
                    <Suspense fallback={<CircularProgress />}>
                        <Barcode data={barcode} />
                    </Suspense>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openBorrow}
                onClose={() => setOpenBorrow(false)}
            >
                <Suspense fallback={<CircularProgress />}>
                    <BorrowConfirm isbn={select} done={id => { setBarcode(id); updateBooks(); setOpenBorrow(false); }} />
                </Suspense>
            </Dialog>
            {mode === "admin" &&
                <Dialog
                    open={openAddBooks}
                    onClose={() => setOpenAddBooks(false)}
                >
                    <Suspense fallback={<CircularProgress />}>
                        <AddBooks done={id => { setBarcode(id); updateBooks(); setOpenAddBooks(false); }} />
                    </Suspense>
                </Dialog>
            }
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
                            <TableCell align='right'>Bclass</TableCell>
                            <TableCell align='right'>Publish date</TableCell>
                            <TableCell align='right'>ISBN</TableCell>
                            <TableCell align='right'>Num</TableCell>
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
                                <TableCell align='right'>{book.bclass}</TableCell>
                                <TableCell align='right'>{book.publish_date}</TableCell>
                                <TableCell align='right'>{book.isbn}</TableCell>
                                <TableCell align='right'>{book.num}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </Container>
    )
}
export default Books;