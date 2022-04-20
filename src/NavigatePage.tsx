//跳转页，该页面会自动重定向至应用主页
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homepage } from "./config";
export default function NavigatePage(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => navigate(homepage, { replace: true }), [navigate]);
    return <></>;
}