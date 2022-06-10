//菜单栏
import { AppBar, Button, Toolbar, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { homepage } from './config';
function Base({ pages, mode }: { pages: { name: string, to: string }[], mode: "user" | "admin" }): JSX.Element {
    const curpath = useLocation().pathname;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem(`${mode}token`) === null) {
            if (mode === "user")
                navigate(homepage === "/" ? "/signin" : `${homepage}/signin`, { replace: true });
            else
                navigate(homepage === "/" ? "/admin/signin" : `${homepage}/admin/signin`, { replace: true });
        }
    });
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Tabs
                        textColor="inherit"
                        value={curpath}
                        sx={{ width: "100%" }}
                    >
                        {pages.map(page => (
                            <Tab
                                key={page.name}
                                component={Link}
                                to={page.to}
                                value={page.to}
                                label={page.name}
                            />
                        ))}
                    </Tabs>
                    <Button
                        color="inherit"
                        onClick={() => {
                            localStorage.removeItem(`${mode}name`);
                            localStorage.removeItem(`${mode}token`);
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