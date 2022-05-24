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
const Signup = lazy(() => import('../Pages/Signup'));
export const memberprto = {
    username : "",
    password : "",
    email : "",
    birth : "",
    phone : "",
    gender : ""
}
export type person = typeof memberprto;
function Member({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [members, setMembers] = useState<person[]>([]);
    const [openAddMembers, setOpenAddMembers] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [alertinfo, setAlertinfo] = useState<{
        open: boolean,
        message: string,
        serivity: AlertColor
    }>({ open: false, message: "", serivity: 'error' });
    const [loading, setLoading] = useState(false);
    useEffect(updateMembers, []);
    
    function updateMembers() {
        setLoading(true);
        fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ action: "getUsers" })
        })
            .then(res => res.json())
            .then(
                obj => { setMembers(obj); setLoading(false); },
                () => {
                    setMembers([
                        {
                             "username": "123455",
                             "password": "123123",
                             "email": "devil@qq.com",
                             "birth":"2001-04-12",
                             "phone":"2132142434",
                             "gender":"男"
                        },
                       {
                             "username": "dsafdasf",
                             "password": "123123",
                             "email": "devil@qq.com",
                             "birth":"2001-04-12",
                             "phone":"2132142434",
                             "gender":"男"
                       }
                   ]); 
                    setLoading(false);
                    /*
                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                    setLoading(false);*/
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
            {mode === "admin" &&
                <>
                    <Dialog
                        open={openAddMembers}
                        onClose={() => setOpenAddMembers(false)}
                        maxWidth={"md"}
                        fullWidth = {true}
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
                </>
            }
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        members.map(members => (
                            <TableRow
                                key={members.username}
                                hover
                            >
                                <TableCell>{members.username}</TableCell>
                                <TableCell>{members.password}</TableCell>
                                <TableCell>{members.email}</TableCell>
                                <TableCell align='right'>{members.birth}</TableCell>
                                <TableCell align='right'>{members.phone}</TableCell>
                                <TableCell align='right'>{members.gender}</TableCell>
                                <IconButton aria-label="delete" size="small"
                                    onClick = {() => { 
                                        setOpenDelete(true);
                                        fetch(`${url}/user`,{
                                            method: 'POST',
                                            mode: 'cors',
                                            body: JSON.stringify({ action : "deleteUser" ,username : members.username })
                                        })
                                        .then(res => res.json())
                                        .then(
                                                obj => { updateMembers(); setLoading(false); },
                                                () => {
                                                    setAlertinfo({ open: true, message: "Network error", serivity: "error" });
                                                    setLoading(false); 
                                                    setOpenAddMembers(false);
                }
            )
                                        setOpenDelete(false);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </Container >
    )
}
export default Member;