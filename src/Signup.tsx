import {
    Box, Button, Container, CssBaseline, Link, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { homepage, url } from './config';
function Signup({ mode }: { mode: "admin" | "user" }): JSX.Element {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [repwd, setRepwd] = useState("");
    const navigate = useNavigate();
    const isUseremail = isEmail(email);
    function handleSubbmit(): void {
        if (user !== "" && pwd !== "" && pwd === repwd) {
            console.log({ email: user, password: pwd });
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    action: "regist",
                    username: user,
                    email: email,
                    password: pwd,
                    birth: "2001-05-19"
                })
            })
                .then(res => res.json(), err => console.log(err))
                .then(obj => {
                    if (obj !== undefined) {
                        if (mode === "user") {
                            navigate(homepage === "/" ? "/signin" : `${homepage}/signin`, { replace: true });
                        } else {
                            navigate(homepage === "/" ? "/admin/signin" : `${homepage}/admin/signin`, { replace: true })
                        }
                    } else {
                        alert("ERROR!");
                    }
                })
        }
    }
    function isEmail(text: string): boolean {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(text)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: 10
            }}>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    label="User name"
                    autoComplete="account"
                    type="text"
                    autoFocus
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                <TextField
                    error={user !== "" && !isUseremail}
                    margin="normal"
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    helperText={(email !== "" && !isUseremail) ? "Not a email" : ""}
                />
                <TextField
                    error={pwd !== "" && pwd.length < 8}
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    helperText={pwd !== "" && pwd.length < 8 ? "Too short" : ""}
                />
                <TextField
                    error={pwd !== repwd && repwd !== ""}
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={repwd}
                    onChange={e => setRepwd(e.target.value)}
                    helperText={pwd !== repwd && repwd !== "" ? "Passwords does not match" : ""}
                />
                <Button
                    sx={{ mt: 2, mb: 3 }}
                    fullWidth
                    variant="contained"
                    disabled={user === "" || pwd.length < 8 || pwd !== repwd || !isUseremail}
                    onClick={handleSubbmit}
                >
                    Sign Up
                </Button>
                <Link component={RouterLink} to={mode === "user" ?
                    (homepage === "/" ? "/signin" : `${homepage}/signin`)
                    : (homepage === "/" ? "/admin/signin" : `${homepage}/admin/signin`)}>Already have a account? Sign in</Link>
            </Box>
        </Container>
    );
}
export default Signup;