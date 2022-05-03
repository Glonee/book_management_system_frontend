import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
export default function Payfine({ done }: { done: () => void }) {
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