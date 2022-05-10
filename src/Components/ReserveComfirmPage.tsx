import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../config";
import Alert from "./Alert";
import { book as booktype } from '../Pages/Books';
export default function ReserveComfirm({ book, user, done }: { book: booktype, user: string, done: () => void }) {
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [loading, setLoading] = useState(false);
    function reserve() {
        setLoading(true);
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "reserve",
                username: user,
                isbn: book.isbn
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        setAlertinfo({ open: true, message: "Failed to reserve" });
                    } else {
                        done();
                    }
                    setLoading(false);
                },
                () => {
                    setAlertinfo({ open: true, message: "Network error" });
                    setLoading(false);
                }
            );
    }
    return (
        <>
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                servrity="error"
                message={alertinfo.message}
            />
            <DialogTitle>Confirm your reserve</DialogTitle>
            <DialogContent>
                <Typography>Name: {book.name}</Typography>
                <Typography>ISBN: {book.isbn}</Typography>
                <Typography>Author: {book.author}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={done}>Cancel</Button>
                <Button disabled={loading} onClick={reserve}>Confirm</Button>
            </DialogActions>
        </>
    )
}