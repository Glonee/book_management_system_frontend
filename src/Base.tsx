import {
    AppBar, Button, Toolbar, Box
} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { homepage } from './config';
function Base({ pages, mode }: { pages: { name: string, to: string }[], mode: "user" | "admin" }): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        if (mode === "user") {
            if (localStorage.getItem("token") === null) {
                navigate(homepage === "/" ? "/signin" : `${homepage}/signin`, { replace: true });
            }
        } else {
            if (localStorage.getItem("admintoken") === null) {
                navigate(homepage === "/" ? "/admin/signin" : `${homepage}/admin/signin`, { replace: true });
            }
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
                            navigate(mode === "user" ?
                                (homepage === "/" ? "/signin" : `${homepage}/signin`)
                                : (homepage === "/" ? "/admin/signin" : `${homepage}/admin/signin`),
                                { replace: true });
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