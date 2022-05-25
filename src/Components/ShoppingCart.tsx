import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { url } from "../config";
import { book as booktype } from '../Pages/Books';
import DeleteIcon from '@mui/icons-material/Delete';
type borrowitem = booktype & { bookid: number };
function ShoppingCart({ books, done, remove, loading, setLoading }: {
    books: borrowitem[],
    done: (bookids: string[]) => void,
    remove: (isbn: string) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void
}): JSX.Element {
    const [user, setUser] = useState("");
    const [failedbooks, setFailedbooks] = useState<borrowitem[]>([]);
    const barcodes = useRef<string[]>([]);
    function borrowMany() {
        setLoading(true);
        Promise.all(books.map(book => fetch(`${url}/user`, {
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
                        return { ok: true, book: book }
                    } else {
                        return { ok: false, book: book }
                    }
                },
                () => ({ ok: false, book: book })
            ))).then(values => {
                const successed = values.filter(value => value.ok).map(value => `${value.book.isbn}/${value.book.bookid}/${value.book.position}`);
                if (successed.length === books.length) {
                    done(successed);
                } else {
                    barcodes.current = successed;
                    setFailedbooks(values.filter(value => !value.ok).map(value => value.book));
                }
                setLoading(false);
            })
    }
    return (
        <>
            <Dialog
                open={failedbooks.length !== 0}
                onClose={() => { setFailedbooks([]); done(barcodes.current) }}
            >
                <DialogTitle>Can't borrow following books</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                    <List>
                        {failedbooks.map(book => (
                            <ListItem key={book.isbn}>
                                <ListItemText
                                    primary={book.name}
                                    secondary={`isbn: ${book.isbn}, bookid: ${book.bookid}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setFailedbooks([]); done(barcodes.current) }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <DialogTitle>Shopping Cart</DialogTitle>
            <DialogContent>
                <List>
                    {books.map(book => (
                        <ListItem
                            key={book.isbn}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() => remove(book.isbn)}
                                    disabled={loading}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={book.name}
                                secondary={`isbn: ${book.isbn}, bookid: ${book.bookid}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={borrowMany} disabled={loading || user === ""}>Check out</Button>
            </DialogActions>
        </>
    )
}
export default ShoppingCart;