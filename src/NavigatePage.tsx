import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NavigatePage() {
    const navigate = useNavigate();
    useEffect(() => navigate("/bms", { replace: true }), [navigate]);
    return <></>;
}