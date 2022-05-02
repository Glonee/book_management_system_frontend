import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { url } from "../config";
import { book as typeofbook } from "./Books";
import Alert from "../Alert";
export default function BorrowConfirm({ isbn, done }: { isbn: string, done: (id: string) => void }) {
    const [alertinfo, setAlertinfo] = useState({ open: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState<typeofbook>();
    useEffect(function getbookinfo() {
        setLoading(true);
        fetch(`${url}/book`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "searchBooks",
                field: "isbn",
                value: isbn
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.length > 0) {
                        setBook(obj[0]);
                    } else {
                        setAlertinfo({ open: true, message: "No such book" });
                    }
                    setLoading(false);
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                    setLoading(false);
                }
            )
    }, [isbn]);
    function borrow() {
        setLoading(true);
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: localStorage.getItem("username"),
                isbn: isbn,
                num: 1
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        done(isbn);
                    } else {
                        setAlertinfo({ open: true, message: "Fail" });
                    }
                    setLoading(false);
                    done(isbn);
                },
                err => {
                    console.log(err);
                    setAlertinfo({ open: true, message: "Network error" });
                    setLoading(false);
                    done(`${isbn}/${123}`)
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
            <DialogTitle>Confirm your borrowing</DialogTitle>
            <DialogContent>
                <Typography>Name: {book === undefined ? "" : book.name}</Typography>
                <Typography>ISBN: {isbn}</Typography>
                <Typography>Author: {book === undefined ? "" : book.author}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => done("")}>Cancel</Button>
                <Button onClick={borrow} disabled={loading}>Confirm</Button>
            </DialogActions>
        </>
    )
}