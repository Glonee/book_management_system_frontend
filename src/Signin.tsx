import {
    Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Link, TextField, Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
function Signin() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    function handleSubbmit() {
        if (user !== "" && pwd !== "") {
            console.log({ email: user, password: pwd });
            localStorage.setItem("token", "123");
            navigate("/", { replace: true });
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
                    label="Email"
                    autoComplete="email"
                    type="email"
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
                <FormControlLabel sx={{ alignSelf: "start" }}
                    label="Remember me"
                    control={
                        <Checkbox
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />
                    }
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
                <Link component={RouterLink} to="/">Don't have a account? Sign up</Link>
            </Box>
        </Container>
    );
}
export default Signin;