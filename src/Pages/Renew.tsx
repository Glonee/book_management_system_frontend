import { Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { borrowitem } from "./Borrow";
import { url } from "../config";
import Alert from "../Alert";
export default function Renew({ item, done }: { item: borrowitem, done: () => void }) {
    const [days, setDays] = useState("");
    const [open, setOpen] = useState(false);
    function RenewBook() {
        fetch(`${url}/user`, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                action: "renew",
                bookid: item.bookid,
                isbn: item.isbn,
                username: item.username,
                time: +days
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 1) {
                        done();
                    } else {
                        setOpen(true);
                    }
                },
                err => {
                    console.log(err);
                    setOpen(true);
                }
            )
    }
    return (
        <>
            <Alert
                message="Can't renew book"
                open={open}
                onClose={() => setOpen(false)}
                servrity="error"
            />
            <DialogTitle>Renew</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={days}
                    margin="normal"
                    onChange={e => setDays(e.target.value)}
                    type="number"
                    label={`Renew ${item.name} for how many days?`}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={done}>Cancel</Button>
                <Button disabled={days === ""} onClick={RenewBook}>Confirm</Button>
            </DialogActions>
        </>
    )
}