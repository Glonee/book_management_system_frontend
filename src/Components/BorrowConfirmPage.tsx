import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../config";
import Alert from "./Alert";
import { book as booktype } from '../Pages/Books';
export default function BorrowConfirm({ book, done }: { book: booktype & { bookid: number }, done: (id: string) => void }) {
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    function borrow() {
        setLoading(true);
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: user,
                isbn: book.isbn,
                bookid: book.bookid,
                num: 1
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        done(`${book.isbn}/${book.bookid}/${book.position}`);
                    } else {
                        setAlertinfo({ open: true, message: "Can't borrow more book" });
                    }
                    setLoading(false);
                },
                () => {
                    setAlertinfo({ open: true, message: "Network error" });
                    setLoading(false);
                }
            )
    }
    return (
        <>
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                servrity="error"
                message={alertinfo.message}
            />
            <DialogTitle>Confirm your borrow</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                <Typography>Name: {book.name}</Typography>
                <Typography>ISBN: {book.isbn}</Typography>
                <Typography>Bookid: {book.bookid}</Typography>
                <Typography>Author: {book.author}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => done("")}>Cancel</Button>
                <Button onClick={borrow} disabled={loading || user === ""}>Confirm</Button>
            </DialogActions>
        </>
    )
}