import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogModal({
    onConfirm,
    onClose,
    email
}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Are you sure you want to delete <span style={{fontWeight: 'bold'}}>{email}</span> account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
