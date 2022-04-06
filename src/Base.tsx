import {
    AppBar, Button, Toolbar, Box
} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Base() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/bms/signin", { replace: true });
        }
    });
    const pages = [
        { name: "Home", to: "/bms" },
        { name: "Books", to: "/bms/books" },
        { name: "Borrow", to: "/bms"}
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
                            navigate("/bms/signin", { replace: true });
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