import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useRef, useState } from "react";
import { url } from "../config";
import { book as booktype } from '../Pages/Books';
import DeleteIcon from '@mui/icons-material/Delete';
function ShoppingCart({ user, books, done, remove, loading, setLoading }: {
    user: string,
    books: booktype[],
    done: (bookids: string[]) => void,
    remove: (isbn: string) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void
}): JSX.Element {
    const [failedbooks, setFailedbooks] = useState<booktype[]>([]);
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
                num: 1
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        return { ok: true, book: book, bookid: obj.bookid as string }
                    } else {
                        return { ok: false, book: book, bookid: "" }
                    }
                },
                () => ({ ok: false, book: book, bookid: "" })
            ))).then(values => {
                const successed = values.filter(value => value.ok).map(value => `${value.book.isbn}/${value.bookid}/${value.book.position}`);
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
                    <List>
                        {failedbooks.map(book => (
                            <ListItem key={book.isbn}>
                                <ListItemText
                                    primary={book.name}
                                    secondary={`isbn: ${book.isbn}`}
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
                                secondary={`isbn: ${book.isbn}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={borrowMany} disabled={loading}>Check out</Button>
            </DialogActions>
        </>
    )
}
export default ShoppingCart;