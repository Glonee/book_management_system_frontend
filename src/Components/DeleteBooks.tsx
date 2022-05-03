import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { url } from "../config";
import { book as booktype } from '../Pages/Books';
import Alert from "./Alert";
export default function DeleteBooks({ book, done }: { book: booktype, done: () => void }) {
    const [loading, setLoading] = useState(false);
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    function deleteBook(isbn: string) {
        setLoading(true);
        fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "deleteBook", isbn: isbn })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 1) {
                        done();
                    } else {
                        setAlertinfo({ open: true, message: "Can't delete book" });
                    }
                    setLoading(false);
                },
                err => {
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
                message={alertinfo.message}
                servrity="error"
            />
            <DialogTitle>Delete book</DialogTitle>
            <DialogContent>
                <DialogContentText>Delete {book.name}?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='error'
                    variant='contained'
                    onClick={() => deleteBook(book.isbn)}
                    disabled={loading}
                >
                    Confirm
                </Button>
            </DialogActions>
        </>
    )
}