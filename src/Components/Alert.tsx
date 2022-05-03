import { Alert as MuiAlert, AlertColor, Snackbar } from "@mui/material";
export default function Alert({ open, onClose, message, servrity }: { open: boolean, onClose: () => void, message: string, servrity: AlertColor }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            open={open}
            onClose={onClose}
        >
            <MuiAlert variant="filled" severity={servrity} sx={{ width: "100%" }}>{message}</MuiAlert>
        </Snackbar>
    )
}