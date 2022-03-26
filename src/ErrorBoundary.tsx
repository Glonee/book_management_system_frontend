import { Component } from "react";
import { Alert, Container } from "@mui/material";
class ErrorBoundary extends Component<{}, { hasError: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="xs" sx={{ mt: 10 }}>
                    <Alert severity="error">Failed to contact server. Try reload this page.</Alert>
                </Container>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;