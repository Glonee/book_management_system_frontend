import { Avatar, Container, Box, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors'
import { useEffect, useMemo, useState } from 'react';
import { url } from '../config';
import Alert from '../Alert';
import Barcode from '../Barcode';
function Home(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [borrowed, setBorrowed] = useState<{
        borrow_date: string,
        deadline: string,
        fine: number,
        isbn: string,
        name: string,
        num: number
    }[]>([]);
    const u = useMemo(() => localStorage.getItem("username"), []);
    const username = u === null ? "?" : u;
    useEffect(updateBowered, []);
    const overduebooks = borrowed.filter(book => book.fine !== 0).length;
    const num = borrowed.length;
    const messages = [`You have ${overduebooks} over due book!`];
    function updateBowered() {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "getBorrowingList",
                username: localStorage.getItem("username")
            })
        })
            .then(res => res.json())
            .then(
                obj => { if (obj !== undefined) { setBorrowed(obj) } },
                err => { console.log(err); setOpen(true); }
            );
    }
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
