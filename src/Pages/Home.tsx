import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';
import Barcode from '../Components/Barcode';
import { homepage, url } from '../config';
function Home(): JSX.Element {
    const [newpwd, setNewpwd] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [borrowed, setBorrowed] = useState<{
        bookid: string,
        borrow_date: string,
        deadline: string,
        fine: number,
        isbn: string,
        name: string,
        time: number
    }[]>([])
    const [reserve, setReserve] = useState<{
        name: string,
        isbn: string,
        username: string,
        reserve_time: string,
        hasbook: boolean
    }[]>([]);
    const [err, setErr] = useState(false);
    const userinfo = useRef({
        birth: "",
        email: "",
        gender: "",
        password: "",
        phone: "",
        username: ""
    })
    const navigate = useNavigate();
    const u = useMemo(() => localStorage.getItem("username"), []);
    const username = u === null ? "?" : u;
    useEffect(() => {
        const actions: [string, (obj: any) => void][] = [
            ["getBorrowingList", setBorrowed],
            ["getReserveList", setReserve]
        ]
        Promise.all([
            ...actions.map(action => {
                const [ac, set] = action;
                return fetch(`${url}/user`, {
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify({
                        action: ac,
                        username: username
                    })
                })
                    .then(res => res.json())
                    .then(obj => set(obj));
            }),
            fetch(`${url}/admin`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({ action: "getUsers" })
            })
                .then(res => res.json())
                .then(obj => { userinfo.current = obj.filter((usr: any) => usr.username === username) })
        ]).catch(() => setErr(true));
    }, [username])
    function ChangePassword() {
        fetch(`${url}/admin`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                ...userinfo.current,
                action: "modify",
                password: newpwd
            })
        }).catch(() => setErr(true));
    }
    return (
        <Container maxWidth="md" component="main">
            <Alert
                message='Network error'
                open={err}
                onClose={() => setErr(false)}
                servrity='error'
            />
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Change Password
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin='normal'
                        fullWidth
                        label="New assword"
                        type="password"
                        value={newpwd}
                        onChange={e => setNewpwd(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ChangePassword}>Subbmit</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: 10
            }}>
                <Barcode data={username} height={200} width={4} />
                <Typography variant='h4' component='p' sx={{ mb: 7 }}>Welcome, {username}</Typography>
                <Grid container spacing={2} mb={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    User Information
                                </Typography>
                                <Typography color="text.secondary">
                                    username: {username}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => setOpenDialog(true)}>
                                    Change Password
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Current Borrowed Books
                                </Typography>
                                <Typography color="text.secondary">
                                    {borrowed.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/borrow`)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Last Return Books
                                </Typography>
                                <Typography color="text.secondary">
                                    {borrowed.length === 0 ?
                                        "None" :
                                        borrowed.reduce((book, item) => {
                                            if (item.time < book.time) {
                                                return item
                                            }
                                            return book;
                                        }).name
                                    }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/borrow`)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Total Fine Amount
                                </Typography>
                                <Typography color="text.secondary">
                                    {borrowed.reduce((presum, book) => presum + book.fine, 0)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/borrow`)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Reserve Status
                                </Typography>
                                <Typography color="text.secondary">
                                    {reserve.filter(item => item.hasbook).length} of your reserved books is available.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/reserve`)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default Home;
