import AddIcon from '@mui/icons-material/Add';
import {
    AlertColor,
    Button, CircularProgress, Container, Dialog, DialogContent,
    DialogTitle, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { lazy, Suspense, useEffect, useState } from 'react';
import Alert from '../Components/Alert';
import { url } from '../config';
const Signup = lazy(() => import('../Components/Signup'));
interface person {
    username: string;
    password: string;
    email: string;
    birth: string;
    phone: string;
    gender: string;
}
function Member(): JSX.Element {
    const [members, setMembers] = useState<person[]>([]);
    const [openAddMembers, setOpenAddMembers] = useState(false);
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        serivity: AlertColor
    }>({ open: false, message: "", serivity: 'error' });
    const [loading, setLoading] = useState(false);
    useEffect(updateMembers, []);

    function updateMembers() {
        setLoading(true);
        fetch(`${url}/admin`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "getUsers" })
        })
            .then(res => res.json())
            .then(
                obj => { setMembers(obj); setLoading(false); },
                () => setLoading(false)
            )
    }
    function deleteUser(username: string) {
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "deleteUser", username: username })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 1) {
                        updateMembers();
                    } else {
                        setAlertinfo({ open: true, message: "Can't delete this user", serivity: "error" });
                    }
                    setLoading(false);
                },
                () => {
                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                    setLoading(false);
                }
            )
    }
    return (
        <Container maxWidth="lg">
            <Alert
                open={alertinfo.open}
                onClose={() => setAlertinfo(pre => ({ ...pre, open: false }))}
                message={alertinfo.message}
                servrity={alertinfo.serivity}
            />
            <Dialog
                open={openAddMembers}
                onClose={() => { setOpenAddMembers(false); updateMembers(); }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add account</DialogTitle>
                <Suspense fallback={<DialogContent><CircularProgress /></DialogContent>}>
                    <Signup />
                </Suspense>
            </Dialog>

            <Button
                disabled={loading}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddMembers(true)}
            >
                Add user
            </Button>
            <TableContainer sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>UserName</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell align='right'>Birth</TableCell>
                            <TableCell align='right'>phone</TableCell>
                            <TableCell align='right'>gender</TableCell>
                            <TableCell align='right'>delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            members.map(member => (
                                <TableRow
                                    key={member.username}
                                    hover
                                >
                                    <TableCell>{member.username}</TableCell>
                                    <TableCell>{member.password}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell align='right'>{member.birth}</TableCell>
                                    <TableCell align='right'>{member.phone}</TableCell>
                                    <TableCell align='right'>{member.gender}</TableCell>
                                    <TableCell align='right'>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => deleteUser(member.username)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </Container >
    )
}
export default Member;