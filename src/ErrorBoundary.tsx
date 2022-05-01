//错误边界，当应用发生未被catch的error时会显示这个页面
import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, Container } from "@mui/material";
class ErrorBoundary extends Component<{ children?: ReactNode }, { hasError: boolean }> {
    constructor(props: { children?: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }
    componentDidCatch(err: Error, errinfo: ErrorInfo) {
        console.log(err);
        console.log(errinfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="xs" sx={{ mt: 10 }}>
                    <Alert severity="error">A error occured. Try reload this page.</Alert>
                </Container>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;