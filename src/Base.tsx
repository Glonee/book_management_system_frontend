//菜单栏
import { AppBar, Button, Toolbar, Tab, TabProps, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { homepage } from './config';
function NavTab(props: TabProps & { to: string }) {
    const navigate = useNavigate();
    const { to, ...prop } = props;
    return <Tab onClick={() => navigate(to, { replace: true })} {...prop} />
}
function Base({ pages, mode }: { pages: { name: string, to: string }[], mode: "user" | "admin" }): JSX.Element {
    const [selected, setSelected] = useState(0);

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
                        onChange={(_, v) => setSelected(v)}
                        value={selected}
                        sx={{ width: "100%" }}
                    >
                        {pages.map(page => (
                            <NavTab to={page.to} key={page.name} label={page.name} />
                        ))}
                    </Tabs>
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