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
    const [lost, setLost] = useState(0);
    const [damaged, setDamaged] = useState(0);
    const u = useMemo(() => localStorage.getItem("adminname"), []);
    const navigate = useNavigate();
    const username = u === null ? "?" : u;
    useEffect(() => {
        const fetches = [
            { action: "getTotalUsers", field: "totalUsers", set: setUsernum },
            { action: "getTotalBooks", field: "totalBooks", set: setBooknum },
            { action: "getTotalBooksNum", field: "totalBooksNum", set: setBookkind },
            { action: "getBorrows", field: "borrows", set: setBookborrowed },
            { action: "getFineCollected", field: "fineCollected", set: setFinecollected },
            { action: "getFineUnpaid", field: "fineUnpaid", set: setFineunpaid },
            { action: "getLost", field: "lost", set: setLost },
            { action: "getDamage", field: "damage", set: setDamaged }
        ]
        Promise.all(fetches.map(fe => fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: fe.action,
            })
        })
            .then(res => res.json())
            .then(obj => fe.set(obj[fe.field]))
        )).catch(err => console.log(err));
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
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Lost book
                                </Typography>
                                <Typography color="text.secondary">
                                    {lost}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/lostbooks`)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5'>
                                    Damaged book
                                </Typography>
                                <Typography color="text.secondary">
                                    {damaged}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(`${homepage}/admin/damagedbooks`)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default Dashboardd;