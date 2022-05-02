import { DialogContent, DialogActions, Button, DialogContentText } from "@mui/material";
export default function Payfine({ fine, done }: { fine: number, done: () => void }) {
    return (
        <>
            <DialogContent>
                <DialogContentText>Done paying ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={done}>Done</Button>
            </DialogActions>
        </>
    )
}