import { LinearProgress } from "@mui/material";
import { ReactNode, Suspense } from "react";
function FallBack({ children }: { children: ReactNode }): JSX.Element {
    return (
        <Suspense fallback={<LinearProgress />}>
            {children}
        </Suspense>
    )
}
export default FallBack;