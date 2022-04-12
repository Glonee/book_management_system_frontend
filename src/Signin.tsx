import {
    Avatar, Box, Button, Container, CssBaseline, Link, TextField, Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { homepage, url } from './config';
function Signin({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    function handleSubbmit(): void {
        if (user !== "" && pwd !== "") {
            console.log({ email: user, password: pwd });
            fetch(url, {
                method:'POST',
                mode:'cors',
                body:JSON.stringify({action: "login", username: user, password: pwd})
            })
            .then(res => res.json(), err => console.log(err))
            .then(obj => {
                if (obj != undefined && obj.state === 1) {
                    localStorage.setItem("token", "123");
                    localStorage.setItem("username", user);
                    if (mode === "user") {
                        navigate(homepage, { replace: true });
                    } else {
                        navigate(homepage === "/" ? "/admin" : `${homepage}/admin`, { replace: true });
                    }
                } else {
                    alert("ERROR!")
                }
            })
            /*
            if (mode === "user") {
                localStorage.setItem("token", "123");
                localStorage.setItem("username", user);
                navigate(homepage, { replace: true });
            } else {
                localStorage.setItem("token", "123");
                localStorage.setItem("username", user);
                navigate(homepage === "/" ? "/admin" : `${homepage}/admin`, { replace: true });
            }
            */
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
                <Avatar sx={{ bgcolor: blue[500], mb: 1 }} />
                <Typography component="h1" variant="h5">Sign in</Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Account"
                    autoComplete="account"
                    type="text"
                    autoFocus
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    autoComplete="password"
                    type="password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            handleSubbmit();
                        }
                    }}
                />
                <Button
                    sx={{ mt: 2, mb: 3 }}
                    fullWidth
                    variant="contained"
                    disabled={user === "" || pwd === ""}
                    onClick={handleSubbmit}
                >
                    Sign In
                </Button>
                <Link component={RouterLink} to={mode === "user" ?
                                (homepage === "/" ? "/signup" : `${homepage}/signup`)
                                : (homepage === "/" ? "/admin/signup" : `${homepage}/admin/signup`)}>Don't have a account? Sign up</Link>
            </Box>
        </Container>
    );
}
export default Signin;