import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../config";
import Alert from "./Alert";
import {book as booktype} from '../Pages/Books';
export default function BorrowConfirm({ book, user, done }: { book: booktype, user: string, done: (id: string) => void }) {
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [loading, setLoading] = useState(false);
    function borrow() {
        setLoading(true);
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: user,
                isbn: book.isbn,
                num: 1
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        done(`${book.isbn}/${obj.bookid}/${book.position}`);
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
                <Typography>Name: {book.name}</Typography>
                <Typography>ISBN: {book.isbn}</Typography>
                <Typography>Author: {book.author}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => done("")}>Cancel</Button>
                <Button onClick={borrow} disabled={loading}>Confirm</Button>
            </DialogActions>
        </>
    )
}