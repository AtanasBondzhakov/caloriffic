import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Input from "../../../forms/input/Input";
import Select from "../../../forms/select/Select";
import { useForm } from "../../../../hooks/useForm";
import CustomButton from "../../../ui/custom-button/CustomButton";
import { useEffect } from "react";

export default function EditUserModal({
    onClose,
    user
}) {
    const { values, handleChange, handleSubmit } = useForm({email: user?.email, role: user?.role}, editUserHandler);

    useEffect(() => {
        (async () => {

        })()
    }, []);

    async function editUserHandler() {
        
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>
                    {"Edit User"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            label="Email"
                        />
                        <Select
                            label="Role"
                            name="role"
                            options={[{ value: 'admin', label: 'admin' }, { value: 'user', label: 'user' }]}
                        />
                        <CustomButton type="submit" label="Save" />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
