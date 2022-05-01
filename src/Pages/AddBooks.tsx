import { AlertColor, Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from "react";
import Alert from "../Alert";
import { apikey, isbnapi, url } from '../config';
function AddBooks({ done }: { done: (id: string) => void }) {
    const [info, setInfo] = useState<{
        name: string;
        author: string;
        isbn: string;
        publish: string;
        price: string;
        publish_date: Date | null;
        bclass: string;
        num: string;
        position: string;
    }>({
        name: "",
        author: "",
        isbn: "",
        publish: "",
        price: "",
        publish_date: null,
        bclass: "",
        num: "",
        position: ""
    });
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
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
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                ...info,
                action: "addBook",
                price: +info.price,
                num: +info.num,
                publish_date: info.publish_date === null ? "" : info.publish_date.toISOString().split('T')[0]
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state !== 1) {
                        setAlertinfo({ open: true, message: "Add book error" });
                    } else {
                        done(info.isbn);
                        setLoading(false);
                    }

                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                    setLoading(false);
                    //done(info.isbn);
                })
    }
    function getbookinfo() {
        setFetching(true);
        fetch(`${isbnapi}/${info.isbn}?apikey=${apikey}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.msg === "请求成功") {
                        const data = obj.data;
                        if (data != null) {
                            setInfo(preinfo => ({
                                ...preinfo,
                                author: data.author == null ? "" : data.author,
                                name: data.name == null ? "" : data.name,
                                publish: data.publishing == null ? "" : data.publishing,
                                price: data.price == null ? "" : (data.price.match(/\d+(.\d+)?/g) == null ? "" : data.price.match(/\d+(.\d+)?/g)[0]),
                                publish_date: (data.published != null && data.published !== "") ? new Date(data.published) : null
                            }))
                        } else {
                            setAlertinfo({ open: true, message: "Book not found. Please add this book manully" });
                        }
                    } else {
                        setAlertinfo({ open: true, message: "Book not found. Please add this book manully" });
                    }
                    setFetching(false);
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                    setFetching(false);
                }
            )
    }
    return (
        <>
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity="error"
            />
            <DialogTitle>Add book</DialogTitle>
            <DialogContent>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    mt: 1
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                sx={{ mt: 0, mb: 0, height: 55 }}
                                margin="normal"
                                fullWidth
                                label="isbn"
                                type="number"
                                value={info.isbn}
                                onChange={e => setInfo(p => ({ ...p, isbn: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                sx={{ mt: 0, mb: 0, height: 55 }}
                                variant="outlined"
                                fullWidth
                                onClick={getbookinfo}
                                disabled={info.isbn.length < 10 || fetching}
                            >
                                Search
                            </Button>
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
export default AddBooks;