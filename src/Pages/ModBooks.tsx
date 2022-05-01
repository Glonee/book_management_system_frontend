import { Container, CssBaseline, Box, TextField, Button, AlertColor } from "@mui/material";
import { useState } from "react";
import { url } from '../config';
import Alert from "../Alert";
function ModBooks() {
    const [info, setInfo] = useState({
        name: "",
        author: "",
        oldBookIsbn: "",
        isbn: "",
        publish: "",
        price: "",
        publish_date: "",
        bclass: "",
        num: ""
    });
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        servrity: AlertColor
    }>({ open: false, message: "", servrity: "error" });
    function handleSubbmit() {
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ ...info, action: "updateBook", publish_date: "2001-05-19", position: "305-5-6" })
        })
            .then(res => res.json(), err => console.log(err))
            .then(
                obj => {
                    if (obj.state !== 1)
                        setAlertinfo({ open: true, message: "Add book error", servrity: "error" });
                    else
                        setAlertinfo({ open: true, message: "Success", servrity: "success" });
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error", servrity: "error" });
                }
            );
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Alert
                message={alertinfo.message}
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                servrity={alertinfo.servrity}
            />
            <Box sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: 10
            }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="name"
                    type="text"
                    value={info.name}
                    onChange={e => setInfo(p => ({ ...p, name: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="author"
                    type="text"
                    value={info.author}
                    onChange={e => setInfo(p => ({ ...p, author: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="old isbn"
                    type="text"
                    value={info.oldBookIsbn}
                    onChange={e => setInfo(p => ({ ...p, oldBookIsbn: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="isbn"
                    type="text"
                    value={info.isbn}
                    onChange={e => setInfo(p => ({ ...p, isbn: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="publish"
                    type="text"
                    value={info.publish}
                    onChange={e => setInfo(p => ({ ...p, publish: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="price"
                    type="number"
                    value={info.price}
                    onChange={e => setInfo(p => ({ ...p, price: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="bclass"
                    type="text"
                    value={info.bclass}
                    onChange={e => setInfo(p => ({ ...p, bclass: e.target.value }))}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="num"
                    type="number"
                    value={info.num}
                    onChange={e => setInfo(p => ({ ...p, num: e.target.value }))}
                />
                <Button
                    sx={{ mt: 2, mb: 3 }}
                    fullWidth
                    variant="contained"
                    onClick={handleSubbmit}
                >
                    Confirm
                </Button>
            </Box>
        </Container>
    )
}
export default ModBooks;