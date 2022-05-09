import { Grid, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { book as booktype, bookprto } from "../Pages/Books";
import Barcode from "./Barcode";
import { isbnapi, apikey } from "../config";
export default function BookDetail({ book, admin }: { book: booktype, admin: boolean }) {
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
        <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                <img src={imgsrc} alt={book.name} loading="lazy" referrerPolicy="no-referrer" />
            </Grid>
            <Grid item xs={admin ? 8 : 6}>
                {admin && <FormControl margin='normal' sx={{ minWidth: 200 }}>
                    <InputLabel id="labelid">Bookid</InputLabel>
                    <Select
                        labelId="labelid"
                        label="Bookid"
                        value={bookid}
                        onChange={e => setBookid(e.target.value)}
                    >
                        {
                            Array.from(Array(+book.num).keys()).map((_, index) => (
                                <MenuItem key={index} value={index.toString()}>{index}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>}
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
    )
}