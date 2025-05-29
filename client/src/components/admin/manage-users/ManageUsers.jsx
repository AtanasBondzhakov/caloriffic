import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './ManageUsers.module.css';
import { deleteUser, getAllUsers } from "../../../store/slices/adminSlice.js";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dateFormatter from "../../../utils/dateFormatter.js";
import DialogModal from "../../ui/dialog-modal/DialogModal.jsx";

export default function ManageUsers() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.admin);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalHandler = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModalHandler = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const deleteUserHandler = (userId) => {
        dispatch(deleteUser(userId));
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            {isModalOpen && <DialogModal onConfirm={() => deleteUserHandler(selectedUser._id)} onClose={closeModalHandler} email={selectedUser.email} />}

            <div className={styles.heading}><h2>Heading</h2></div>
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
                                        <IconButton>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon onClick={() => openModalHandler(user)} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
