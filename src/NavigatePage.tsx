import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homepage } from "./config";
export default function NavigatePage() {
    const navigate = useNavigate();
    useEffect(() => navigate(homepage === "" ? "/" : homepage, { replace: true }), [navigate]);
    return <></>;
}