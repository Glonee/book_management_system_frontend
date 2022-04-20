//用于包装懒加载组件。在懒加载组件加载完成前，显示一个加载条。
import { LinearProgress } from "@mui/material";
import { ReactNode, Suspense } from "react";
function Sus({ children }: { children: ReactNode }): JSX.Element {
    return (
        <Suspense fallback={<LinearProgress />}>
            {children}
        </Suspense>
    )
}
export default Sus;