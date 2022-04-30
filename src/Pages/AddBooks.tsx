import { Container, CssBaseline, Box, TextField, Button, Grid, AlertColor } from "@mui/material";
import { useState } from "react";
import { url, isbnapi, apikey } from '../config';
import Alert from "../Alert";
function AddBooks({ done }: { done: (id: string) => void }) {
    const [info, setInfo] = useState({
        name: "",
        author: "",
        isbn: "",
        publish: "",
        price: "",
        bclass: "",
        num: ""
    });
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        servrity: AlertColor,
        message: string
    }>({ open: false, servrity: "error", message: "" });
    function handleSubbmit() {
        /*
        setLoading(true);
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ ...info, action: "addBook", publish_date: "2001-05-19", position: "305-5-6" })
        })
            .then(res => res.json())
            .then(obj => {
                if (obj.state !== 1)
                    setAlertinfo({ open: true, servrity: "error", message: "Add book error" });
                else
                    setAlertinfo({ open: true, servrity: "success", message: "Success" });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setAlertinfo({ open: true, servrity: "error", message: "Network error" });
                setLoading(false);
            });
        */
        if (info.isbn !== "") {
            done(info.isbn);
        }
    }
    function getbookinfo() {
        setFetching(true);
        fetch(`${isbnapi}/${info.isbn}?apikey=${apikey}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(obj => {
                if (obj.msg === "请求成功") {
                    const data = obj.data;
                    if ("author" in data && "name" in data && "publishing" in data && "price" in data) {
                        setInfo(preinfo => ({
                            ...preinfo,
                            author: data.author,
                            name: data.name,
                            publish: data.publishing,
                            price: data.price
                        }))
                    }
                } else {
                    setAlertinfo({ open: true, message: "Book not found. Please add this book manully", servrity: "warning" });
                }
                setFetching(false);
            })
            .catch(err => {
                console.log(err);
                setAlertinfo({ open: true, message: "Network error", servrity: "error" });
                setFetching(false);
            });
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
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
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="price"
                            type="text"
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
                    <Grid item xs={12}>
                        <Button
                            sx={{ mt: 2, mb: 3 }}
                            fullWidth
                            variant="contained"
                            onClick={handleSubbmit}
                            disabled={loading}
                        >
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default AddBooks;