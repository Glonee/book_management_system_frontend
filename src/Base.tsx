import {
    AppBar, Button, Toolbar
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
function Base() {
    const navigate = useNavigate();
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Button
                        color="inherit"
                        size="large"
                        onClick={() => navigate("/", { replace: true })}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        onClick={() => navigate("books", { replace: true })}
                    >
                        Books
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        onClick={() => navigate("borrow", { replace: true })}
                    >
                        Borrow/Renew/Return
                    </Button>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
}
export default Base;