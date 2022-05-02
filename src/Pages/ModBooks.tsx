import { Box, TextField, Button, AlertColor, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useState } from "react";
import { url } from '../config';
import Alert from "../Alert";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { book as booktype } from './Books';
function ModBooks({ book, done }: { book: booktype, done: () => void }) {
    const [info, setInfo] = useState<{
        name: string;
        author: string;
        oldBookIsbn: string;
        isbn: string;
        publish: string;
        price: string;
        publish_date: Date | null;
        bclass: string;
        num: string;
        position: string;
    }>({
        ...book,
        oldBookIsbn: book.isbn,
        price: book.price.toString(),
        num: book.num.toString(),
        publish_date: new Date(book.publish_date)
    });
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        servrity: AlertColor
    }>({ open: false, message: "", servrity: "error" });
    const [loading, setLoading] = useState(false);
    function check(): boolean {
        return (
            info.author !== "" &&
            info.bclass !== "" &&
            info.isbn !== "" &&
            info.name !== "" &&
            info.num !== "" &&
            info.position !== "" &&
            info.price !== "" &&
            info.publish !== "" &&
            info.publish_date !== null &&
            !isNaN(info.publish_date.getDate())
        )
    }
    function handleSubbmit() {
        setLoading(true);
        fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                ...info,
                action: "updateBook",
                price: +info.price,
                num: +info.num,
                publish_date: (info.publish_date as Date).toISOString().split('T')[0]
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state !== 1) {
                        setAlertinfo({ open: true, message: "Add book error", servrity: "error" });
                    } else {
                        setAlertinfo({ open: true, message: "Success", servrity: "success" });
                        done();
                    }
                    setLoading(false);
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error", servrity: "error" });
                    setLoading(false);
                }
            );
    }
    return (
        <>
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity={alertinfo.servrity}
            />
            <DialogTitle>Modify book</DialogTitle>
            <DialogContent>
                <Alert
                    open={alertinfo.open}
                    onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                    message={alertinfo.message}
                    servrity={alertinfo.servrity}
                />
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    mt: 1
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="isbn"
                                type="number"
                                value={info.isbn}
                                onChange={e => setInfo(p => ({ ...p, isbn: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="old isbn"
                                type="number"
                                value={info.oldBookIsbn}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="name"
                                type="text"
                                value={info.name}
                                onChange={e => setInfo(p => ({ ...p, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="author"
                                type="text"
                                value={info.author}
                                onChange={e => setInfo(p => ({ ...p, author: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="publish"
                                type="text"
                                value={info.publish}
                                onChange={e => setInfo(p => ({ ...p, publish: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="publish date"
                                    value={info.publish_date}
                                    onChange={e => setInfo(p => ({ ...p, publish_date: e }))}
                                    renderInput={params => <TextField fullWidth sx={{ mt: 2, mb: 2 }} {...params} />}
                                ></DatePicker>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="price"
                                type="number"
                                value={info.price}
                                onChange={e => setInfo(p => ({ ...p, price: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="bclass"
                                type="text"
                                value={info.bclass}
                                onChange={e => setInfo(p => ({ ...p, bclass: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="num"
                                type="number"
                                value={info.num}
                                onChange={e => setInfo(p => ({ ...p, num: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="position"
                                type="text"
                                value={info.position}
                                onChange={e => setInfo(p => ({ ...p, position: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubbmit}
                    disabled={loading || !check()}
                >
                    Confirm
                </Button>
            </DialogActions>
        </>
    )
}
export default ModBooks;