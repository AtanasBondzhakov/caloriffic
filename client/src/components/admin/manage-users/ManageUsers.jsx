import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './ManageUsers.module.css';
import { deleteUser, getAllUsers } from "../../../store/slices/adminSlice.js";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dateFormatter from "../../../utils/dateFormatter.js";

export default function ManageUsers() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const deleteUserHandler = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}><h2>Heading</h2></div>
            <div className={styles.table}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#5380bb' }}>
                            <TableRow>
                                <TableCell align="center"><input type="checkbox" /></TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>ID</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>Email</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>Role</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>Created At</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(row => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell align="center" sx={{ width: '5%', whiteSpace: 'nowrap' }}><input type="checkbox" /></TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{row._id}</TableCell>
                                    <TableCell align="center" width={'auto'}>{row.email}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{row.role}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{dateFormatter(row.createdAt)}</TableCell>
                                    <TableCell align="center" sx={{ width: '10%', whiteSpace: 'nowrap' }}>
                                        <IconButton>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon onClick={() => deleteUserHandler(row._id)} />
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
