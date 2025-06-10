import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import Input from "../../../forms/input/Input";
import Select from "../../../forms/select/Select";
import { useForm } from "../../../../hooks/useForm";
import CustomButton from "../../../ui/custom-button/CustomButton";
import style from '../edit-user-modal/EditUserModal.module.css';
import { editUser, resetUpdateStatus } from "../../../../store/slices/adminSlice";

const roleOptions = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' }
]

export default function EditUserModal({
    onClose,
    user
}) {
    const dispatch = useDispatch();
    const { updateStatus } = useSelector(state => state.admin);

    const { values, handleChange, handleSubmit } = useForm({
        email: user.email,
        role: user.role
    }, editUserHandler);

    async function editUserHandler() {
        const editUserData = { _id: user._id, ...values };

        dispatch(editUser(editUserData));
    };

    useEffect(() => {
        if (updateStatus === 'fulfilled') {
            onClose();
            dispatch(resetUpdateStatus());
        }
    }, [dispatch, updateStatus, onClose]);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        maxWidth: '500px',
                        alignItems: 'center'
                    }
                }}
            >
                <DialogTitle>
                    {"Edit User"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className={style.form}>
                        <Input
                            className={style.input}
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            label="Email"
                        />
                        <Select
                            className={style['select-option']}
                            label="Role"
                            name="role"
                            options={roleOptions}
                            value={values.role}
                            onChange={handleChange}
                        />
                        <CustomButton type="submit" label="Save" />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
