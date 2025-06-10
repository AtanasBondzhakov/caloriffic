import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import style from '../edit-user-modal/EditUserModal.module.css';
import { useForm } from "../../../../hooks/useForm";
import { editUser, resetUpdateStatus } from "../../../../store/slices/adminSlice";
import { editUserSchema } from '../../../../schema/editUserSchema';
import Input from "../../../forms/input/Input";
import Select from "../../../forms/select/Select";
import ErrorMessage from '../../../ui/error-message/ErrorMessage';
import CustomButton from "../../../ui/custom-button/CustomButton";

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

    const { values, errors: validationErrors, handleChange, handleSubmit } = useForm({
        email: user.email,
        role: user.role
    }, editUserHandler, editUserSchema);

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
                        <div className={style.buttons}>
                            <CustomButton type="submit" label="Save" />
                            <CustomButton type="button" label="Cancel" handleClick={onClose}/>
                        </div>

                    </form>

                    {Object.keys(validationErrors).length > 0 && <ErrorMessage errors={Object.values(validationErrors)} />}
                </DialogContent>
            </Dialog>
        </>
    );
};
