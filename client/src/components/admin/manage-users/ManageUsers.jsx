import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './ManageUsers.module.css';
import { deleteUser, getAllUsers, getOneUser } from "../../../store/slices/adminSlice.js";
import dateFormatter from "../../../utils/dateFormatter.js";
import DialogModal from "../../ui/dialog-modal/DialogModal.jsx";
import Spinner from "../../ui/spinner/Spinner";
import CustomButton from "../../ui/custom-button/CustomButton.jsx";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditUserModal from "./edit-user-modal/EditUserModal.jsx";

export default function ManageUsers() {
    const dispatch = useDispatch();
    const { users, loading, selectedUser } = useSelector(state => state.admin);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const openModalHandler = async (userId, mode) => {
        const result = await dispatch(getOneUser(userId));

        if (result.meta.requestStatus === 'fulfilled') {
            if (mode === 'edit') {
                setEditOpen(true);
            } else {
                setIsModalOpen(true);
            }
        }

    };

    const closeModalHandler = () => {
        setIsModalOpen(false);
        setEditOpen(false);
    };

    const refetchUsers = useCallback(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        refetchUsers();
    }, [refetchUsers]);

    const deleteUserHandler = (userId) => {
        dispatch(deleteUser(userId));
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            {isModalOpen && (
                <DialogModal
                    onConfirm={() => deleteUserHandler(selectedUser._id)}
                    onClose={closeModalHandler}
                    email={selectedUser?.email}
                />
            )}
            {editOpen && <EditUserModal onClose={closeModalHandler} user={selectedUser} />}

            <div className={styles.heading}><h2>User List</h2></div>

            {loading && users.length === 0 && <Spinner />}

            {users.length !== 0 && (
                <div className={styles.table}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#5380bb' }}>
                                <TableRow>
                                    <TableCell align="center" sx={{ color: "white" }}>ID</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Email</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Role</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Created At</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow
                                        key={user._id}
                                    >
                                        <TableCell align="center" sx={{ width: 'auto' }}>{user._id}</TableCell>
                                        <TableCell align="center" width={'auto'}>{user.email}</TableCell>
                                        <TableCell align="center" sx={{ width: 'auto' }}>{user.role}</TableCell>
                                        <TableCell align="center" sx={{ width: 'auto' }}>{dateFormatter(user.createdAt)}</TableCell>
                                        <TableCell align="center" sx={{ width: '10%', whiteSpace: 'nowrap' }}>
                                            <IconButton onClick={() => openModalHandler(user._id, 'edit')} >
                                                <EditOutlinedIcon /> <span className={styles.edit}>Edit</span>
                                            </IconButton>
                                            <IconButton onClick={() => openModalHandler(user._id, 'delete')} disabled={loading} >
                                                <DeleteOutlineOutlinedIcon /> <span className={styles.del}>{loading && selectedUser?._id === user._id ? 'Deleting...' : 'Delete'}</span>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={styles.bottom}>
                        <div className={styles['bottom-left']}>
                            <CustomButton label="Refresh" handleClick={refetchUsers} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
