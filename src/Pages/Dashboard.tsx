import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Grid, List, ListItemText, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';
import Alert from '../Components/Alert';
import { url } from '../config';
function Dashboardd({ mode }: { mode: "admin" }): JSX.Element {
    
    const [open, setOpen] = useState(false);
    const [usernum, setUsernum] = useState(0);
    const [bookkind, setBookkind] = useState(0);
    const [booknum, setBooknum] = useState(0);
    const [bookborrowed, setBookborrowed] = useState(0);
    const [finecollected, setFinecollected] = useState(0);
    const [fineunpaid, setFineunpaid] = useState(0);
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const username = u === null ? "?" : u;
    
    
    useEffect(() => {//用户数量
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getTotalUsers",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setUsernum(obj.totalUsrs); },
                () => setOpen(true)
            );
    },[usernum]);


    useEffect(() => {//图书种类数量
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getTotalBooks",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setBooknum(obj.totalBooks); },
                () => setOpen(true)
            );
    },[bookkind]);

    useEffect(() => {//图书数量
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getTotalBooksNum",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setBookkind(obj.totalBooksNum); },
                () => setOpen(true)
            );
    },[booknum]);

    useEffect(() => {//借出去的图书数量
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrows",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setBookborrowed(obj.borrows); },
                () => setOpen(true)
            );
    },[bookborrowed]);

    useEffect(() => {//已缴纳的罚款金额
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getFineCollected",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setFinecollected(obj.fineCollected); },
                () => setOpen(true)
            );
    },[finecollected]);

    useEffect(() => {//未缴纳的罚款金额
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getFineUnpaid",
                username: username
            })
        })
            .then(res => res.json())
            .then(
                obj => { setFineunpaid(obj.fineUnpaid); },
                () => setOpen(true)
            );
    },[fineunpaid]);

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
                                <List>
                                    {
                                    /*messages.map((msg, index) => (
                                        <ListItemText key={index}>
                                            {msg}
                                        </ListItemText>
                                    ))*/
                                    usernum}
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button
                                    /*onClick={}*/
                                >
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
                                <Button>Learn More</Button>
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
                                <Button>Learn More</Button>
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
                                <Button>Learn More</Button>
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