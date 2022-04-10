import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homepage } from "./config";
export default function NavigatePage(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => navigate(homepage, { replace: true }), [navigate]);
    return <></>;
}