import {
    AppBar, Button, Toolbar, Box
} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { homepage, pages } from './config';
function Base() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate(`${homepage}/signin`, { replace: true });
        }
    });
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
                            navigate(`${homepage}/signin`, { replace: true });
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