//登录页
import { Avatar, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import { homepage, url } from '../config';
function Signin({ mode }: { mode: "user" | "admin" }): JSX.Element {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [loadding, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "" });
    const navigate = useNavigate();
    function handleSubbmit(): void {
        if (user !== "" && pwd !== "") {
            setLoading(true);
            fetch(`${url}/${mode}`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ action: "login", username: user, password: pwd })
            })
                .then(res => res.json())
                .then(
                    obj => {
                        if (obj.state === 1) {
                            localStorage.setItem(`${mode}token`, "123");
                            localStorage.setItem(`${mode}name`, user);
                            if (mode === "user") {
                                navigate(homepage, { replace: true });
                            } else {
                                navigate(homepage === "/" ? "/admin" : `${homepage}/admin`, { replace: true });
                            }
                        } else {
                            setAlert({ open: true, message: "Wrong username or password" })
                            setLoading(false);
                        }
                    },
                    () => {
                        setAlert({ open: true, message: "Can not contact server" })
                        setLoading(false);
                    }
                )
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Alert
                open={alert.open}
                onClose={() => setAlert(pre => ({ ...pre, open: false }))}
                message={alert.message}
                servrity="error"
            />
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
                    disabled={user === "" || pwd === "" || loadding}
                    onClick={handleSubbmit}
                >
                    {loadding ? "LOADDING" : "SIGN IN"}
                </Button>
                {mode === "user" &&
                    <Link component={RouterLink} to={homepage === "/" ? "/signup" : `${homepage}/signup`}>
                        Don't have a account? Sign up
                    </Link>
                }
            </Box>
        </Container>
    );
}
export default Signin;