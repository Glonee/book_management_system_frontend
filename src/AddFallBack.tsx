import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
function AddFallBack({ Component }: { Component: JSX.Element }): JSX.Element {
    return (
        <Suspense fallback={<LinearProgress />}>
            {Component}
        </Suspense>
    )
}
export default AddFallBack;