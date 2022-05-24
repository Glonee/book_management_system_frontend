import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';
import { url, homepage } from '../config';
function Dashboardd(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [usernum, setUsernum] = useState(0);
    const [bookkind, setBookkind] = useState(0);
    const [booknum, setBooknum] = useState(0);
    const [bookborrowed, setBookborrowed] = useState(0);
    const [finecollected, setFinecollected] = useState(0);
    const [fineunpaid, setFineunpaid] = useState(0);
    const u = useMemo(() => localStorage.getItem("adminname"), []);
    const navigate = useNavigate();
    const username = u === null ? "?" : u;
    useEffect(() => {
        const fetches = [
            { action: "getTotalUsers", field: "totalUsrs", set: setUsernum },
            { action: "getTotalBooks", field: "totalBooks", set: setBooknum },
            { action: "getTotalBooksNum", field: "totalBooksNum", set: setBookkind },
            { action: "getBorrows", field: "borrows", set: setBookborrowed },
            { action: "getFineCollected", field: "fineCollected", set: setFinecollected },
            { action: "getFineUnpaid", field: "fineUnpaid", set: setFineunpaid }
        ]
        Promise.all(fetches.map(fe => fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: fe.action,
                username: username
            })
        })
            .then(res => res.json())
            .then(obj => fe.set(obj[fe.field]))
        )).catch(() => setOpen(true));
    }, [username]);
    return (
        <Container maxWidth="md" component="main">
            <Alert
                message='Network error'
                open={open}
                onClose={() => setOpen(false)}
                servrity='error'
            />
            <Box sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: 10
            }}>
                {/*
                <Avatar sx={{ bgcolor: blue[400], height: 100, width: 100, mb: 3, fontSize: 70 }}>{usernum}</Avatar>
                <Typography variant='h4' component='p' sx={{ mb: 7 }}>Welcome, {username}</Typography>
                */}
                <Grid container spacing={2} mb={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Members
                                </Typography>
                                <Typography color="text.secondary">
                                    {usernum}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/member`)}>
                                    learn more
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Book Types
                                </Typography>
                                <Typography color="text.secondary">
                                    {bookkind}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/books`)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Books Number
                                </Typography>
                                <Typography color="text.secondary">
                                    {booknum}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/books`)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Books Lent
                                </Typography>
                                <Typography color="text.secondary">
                                    {bookborrowed}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/books`)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Fine Collected
                                </Typography>
                                <Typography color="text.secondary">
                                    {finecollected}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Fine Unpaid
                                </Typography>
                                <Typography color="text.secondary">
                                    {fineunpaid}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )




    //    ,bookkind,booknum,bookborrowed,finecollected,fineunpaid
    /*
    const [num, setNum] = useState(0);
    const [overduebooks, setOverduebooks] = useState(0);
    const [bookavailable, setBookavailable] = useState(0);
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const username = u === null ? "?" : u;
    const u1 = username === "" ? "" : username[0];
    const messages = [
        `You have ${overduebooks} over due book.`,
        `${bookavailable} of your reserved book is available.`
    ];
    */
    /*
     useEffect(() => {
         fetch(`${url}/user`, {
             method: 'POST',
             mode: 'cors',
             body: JSON.stringify({
                 action: "getBorrowingList",
                 username: username
             })
         })
             .then(res => res.json())
             .then(
                 obj => { setNum(obj.length); setOverduebooks(obj.filter((book: any) => book.fine !== 0).length) },
                 () => setOpen(true)
             );
         fetch(`${url}/user`, {
             method: 'POST',
             mode: 'cors',
             body: JSON.stringify({
                 action: "getReserveList",
                 username: username
             })
         })
             .then(res => res.json())
             .then(
                 obj => setBookavailable(obj.filter((book: any) => book.hasbook).length),
                 () => setOpen(true)
             )
     }, [username]);*/
    /*
    return (
        <Container maxWidth="md" component="main">
            <Alert
                message='Network error'
                open={open}
                onClose={() => setOpen(false)}
                servrity='error'
            />
            <Box sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: 10
            }}>
                <Avatar sx={{ bgcolor: blue[400], height: 100, width: 100, mb: 3, fontSize: 70 }}>{u1}</Avatar>
                <Typography variant='h4' component='p' sx={{ mb: 7 }}>Welcome, {username}</Typography>
                <Grid container spacing={2} mb={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Inbox
                                </Typography>
                                <List>
                                    {messages.map((msg, index) => (
                                        <ListItemText key={index}>
                                            {msg}
                                        </ListItemText>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button>Clear</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Basic information
                                </Typography>
                                <Typography color="text.secondary">
                                    User: {username}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Borrowed books
                                </Typography>
                                <Typography color="text.secondary">
                                    You have borrowed {num} book(s)
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )*/
}
export default Dashboardd;