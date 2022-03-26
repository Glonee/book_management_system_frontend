import {
    AppBar, Button, Toolbar
} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Base() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            //navigate("/signin", { replace: true });
            console.log("haha");
        }
    });
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
            <div style={{ marginTop: 70 }}>
                <Outlet />
            </div>
        </>
    )
}
export default Base;