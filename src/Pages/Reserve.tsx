import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import Alert from "../Alert";
import { url } from '../config';
export default function Reserve({ done }: { done: () => void }) {
    const [isbn, setIsbn] = useState("");
    const [open, setOpen] = useState(false);
    function ReserveBook() {
        if (isbn !== "") {
            fetch(`${url}/book`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    action: "booking",
                    username: localStorage.getItem("username"),
                    isbn: isbn
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
    }
    return (
        <>
            <Alert
                message="Can't reserve book"
                open={open}
                onClose={() => setOpen(false)}
                servrity="error"
            />
            <DialogTitle>Reserve Book</DialogTitle>
            <DialogContent>
                <TextField
                    label="isbn"
                    value={isbn}
                    fullWidth
                    type="text"
                    onChange={e => setIsbn(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ReserveBook}>Confirm</Button>
            </DialogActions>
        </>
    )
}