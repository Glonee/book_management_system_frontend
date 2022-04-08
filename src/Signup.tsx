import {
    Box, Button, Container, CssBaseline, Link, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { homepage } from './config';
function Signup() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [repwd, setRepwd] = useState("");
    const navigate = useNavigate();
    function handleSubbmit() {
        if (user !== "" && pwd !== "" && pwd === repwd) {
            console.log({ email: user, password: pwd });
            navigate(`${homepage}/signin`, { replace: true });
        }
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
                    label="Email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    value={user}
                    onChange={e => setUser(e.target.value)}
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
                    disabled={user === "" || pwd.length < 8 || pwd !== repwd}
                    onClick={handleSubbmit}
                >
                    Sign Up
                </Button>
                <Link component={RouterLink} to={`${homepage}/signin`}>Already have a account? Sign in</Link>
            </Box>
        </Container>
    );
}
export default Signup;