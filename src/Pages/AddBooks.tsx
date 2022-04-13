import { Container, CssBaseline, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { url } from '../config';
function AddBooks() {
    const [info, setInfo] = useState({
        name: "",
        author: "",
        isbn: "",
        publish: "",
        price: "",
        bclass: "",
        num: ""
    })
    function handleSubbmit() {
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ ...info, action: "addBook", publish_date: "2001-05-19", position: "305-5-6" })
        })
            .then(res => res.json(), err => console.log(err))
            .then(obj => {
                if (obj.state !== 1)
                    alert("add book error")
                else
                    alert("Success")
            });
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
export default AddBooks;