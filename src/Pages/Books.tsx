import AddIcon from '@mui/icons-material/Add';
import {
    AlertColor,
    Button, CircularProgress, Container, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import Alert from '../Components/Alert';
import Barcode from '../Components/Barcode';
import BookDetail from '../Components/BookDetail';
import { url } from '../config';
const AddBooks = lazy(() => import('../Components/AddBooks'));
const BorrowConfirm = lazy(() => import('../Components/BorrowConfirmPage'));
const ModBooks = lazy(() => import('../Components/ModBooks'));
const DeleteBooks = lazy(() => import('../Components/DeleteBooks'));
export const bookprto = {
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
    const [books, setBooks] = useState<book[]>([
        {
            author: "abc",
            bclass: "aaa",
            isbn: "9787040396638",
            name: "cpp",
            num: 10,
            position: "A-10",
            price: 100,
            publish: "aa",
            publish_date: "2012-05-01"
        }
    ]);
    const [openBorrow, setOpenBorrow] = useState(false);
    const [openAddBooks, setOpenAddBooks] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openModify, setOpenModify] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectBy, setSelectBy] = useState<keyof book>("name");
    const [searchText, setSearchText] = useState("");
    const [barcodes, setBarcodes] = useState<string[]>([]);
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        serivity: AlertColor
    }>({ open: false, message: "", serivity: 'error' });
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(bookprto);
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const username = u === null ? "" : u;
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
                () => {
                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                    setLoading(false);
                }
            )
    }
    return (
        <Container maxWidth="lg">
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity={alertinfo.serivity}
            />
            <Dialog
                open={barcodes.length !== 0}
                onClose={() => setBarcodes([])}
                maxWidth="lg"
            >
                <DialogTitle>Barcodes</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    {barcodes.map(barcode => (
                        <Barcode key={barcode} data={barcode} />
                    ))}
                </DialogContent>
            </Dialog>
            <Dialog
                open={openBorrow}
                onClose={() => setOpenBorrow(false)}
            >
                <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                    <BorrowConfirm isbn={select.isbn} user={username} done={id => { setBarcodes([id]); updateBooks(); setOpenBorrow(false); }} />
                </Suspense>
            </Dialog>
            <Dialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Detail</DialogTitle>
                <DialogContent>
                    <BookDetail book={select} />
                </DialogContent>
                <DialogActions>
                    {mode === "admin" &&
                        <>
                            <Button color="error" onClick={() => { setOpenDelete(true); setOpenDetail(false); }}>Delete</Button>
                            <Button color="warning" onClick={() => { setOpenModify(true); setOpenDetail(false); }}>Modify</Button>
                        </>
                    }
                    <Button onClick={() => { setOpenBorrow(true); setOpenDetail(false); }}>Borrow</Button>
                </DialogActions>
            </Dialog>
            {mode === "admin" &&
                <>
                    <Dialog
                        open={openAddBooks}
                        onClose={() => setOpenAddBooks(false)}
                    >
                        <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                            <AddBooks done={ids => { updateBooks(); setBarcodes(ids); setOpenAddBooks(false); }} />
                        </Suspense>
                    </Dialog>
                    <Dialog
                        open={openModify}
                        onClose={() => setOpenModify(false)}
                    >
                        <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                            <ModBooks
                                book={select}
                                done={() => { updateBooks(); setOpenModify(false) }} />
                        </Suspense>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                        maxWidth="xs"
                        fullWidth
                    >
                        <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                            <DeleteBooks
                                book={select}
                                done={() => { updateBooks(); setOpenDelete(false); }}
                            />
                        </Suspense>
                    </Dialog>
                    <Button
                        disabled={loading}
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddBooks(true)}
                    >
                        Add book
                    </Button>
                </>
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
                                onClick={() => { setSelect(book); setOpenDetail(true); }}
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
        </Container >
    )
}
export default Books;