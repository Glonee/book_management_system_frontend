import {
    AppBar, Button, Toolbar, Box
} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Base() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/signin", { replace: true });
        }
    });
    const pages = [
        { name: "Home", to: "/" },
        { name: "Books", to: "books" }
    ]
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Box sx={{ width: "100%" }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                color="inherit"
                                onClick={() => navigate(page.to, { replace: true })}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Button
                        color="inherit"
                        onClick={() => {
                            localStorage.clear();
                            navigate("/signin", { replace: true });
                        }}
                    >
                        LOGOUT
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