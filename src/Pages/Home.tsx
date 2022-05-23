import { Box, Button, Card, CardActions, CardContent, Container, Grid, List, ListItemText, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Alert from '../Components/Alert';
import Barcode from '../Components/Barcode';
import { url } from '../config';
function Home({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(0);
    const [overduebooks, setOverduebooks] = useState(0);
    const [bookavailable, setBookavailable] = useState(0);
    const u = useMemo(() => localStorage.getItem(`${mode}name`), [mode]);
    const username = u === null ? "?" : u;
    const messages = [
        `You have ${overduebooks} over due book.`,
        `${bookavailable} of your reserved book is available.`
    ];
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
                <Barcode data={username} height={200} width={4} />
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
    )
}
export default Home;
