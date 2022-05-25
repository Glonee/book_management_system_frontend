import { Grid, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchbook as booktype, bookprto } from "../Pages/Books";
import Barcode from "./Barcode";
import { isbnapi, apikey } from "../config";
export default function BookDetail({ book, admin, addcartdisabled, deletebook, modify, addtocart, borrow, reserve }: {
    book: booktype,
    admin: boolean,
    addcartdisabled: boolean,
    deletebook: () => void,
    modify: () => void,
    addtocart: (bookid: number) => void,
    borrow: (bookid: number) => void,
    reserve: () => void
}) {
    const [bookid, setBookid] = useState("");
    const [imgsrc, setimgsrc] = useState("");
    const keys = Object.keys(bookprto) as (keyof booktype)[];
    useEffect(() => {
        fetch(`${isbnapi}/${book.isbn}?apikey=${apikey}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.msg === "请求成功") {
                        const data = obj.data;
                        if (data != null) {
                            setimgsrc(data.photoUrl != null ? data.photoUrl : "");
                        }
                    }
                },
                () => { }
            );
    }, [book.isbn]);
    return (
        <>
            <DialogTitle>Detail</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <img src={imgsrc} alt={book.name} loading="lazy" referrerPolicy="no-referrer" />
                    </Grid>
                    <Grid item xs={admin ? 8 : 6}>
                        <FormControl margin='normal' sx={{ minWidth: 200 }}>
                            <InputLabel id="labelid">Bookid</InputLabel>
                            <Select
                                labelId="labelid"
                                label="Bookid"
                                value={bookid}
                                onChange={e => setBookid(e.target.value)}
                            >
                                {
                                    book.availBookid.map(id => (
                                        <MenuItem
                                            key={id}
                                            value={id.toString()}
                                        >
                                            {id}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <List>
                            {keys.map(key => (
                                <ListItem>
                                    <ListItemText key={key}>
                                        {key}: {book[key]}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    {admin && <Grid item xs={5}>
                        {bookid !== "" && <Barcode data={`${book.isbn}/${bookid}/${book.position}`} />}
                    </Grid>}
                </Grid>
            </DialogContent>
            <DialogActions>
                {admin && <>
                    <Button color="error" onClick={deletebook}>Delete</Button>
                    <Button color="warning" onClick={modify}>Modify</Button>
                </>}
                {book.num !== 0 ?
                    <>
                        <Button onClick={() => addtocart(+bookid)} disabled={addcartdisabled || bookid === ""}>Add to cart</Button>
                        <Button onClick={() => borrow(+bookid)} disabled={bookid === ""}>Borrow</Button>
                    </> :
                    <Button onClick={reserve}>Reserve</Button>
                }
            </DialogActions>
        </>
    )
}