import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from '../manage-profiles/ManageProfiles.module.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useEffect, useState } from "react";
import requester from "../../../api/requester";

export default function ManageProfiles() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await requester.get('/admin/manage-profiles');
            setProfiles(result);
        })();
    }, []);

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
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Created At</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles.map(row => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell align="center" sx={{ width: '5%', whiteSpace: 'nowrap' }}><input type="checkbox" /></TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{row._id}</TableCell>
                                    <TableCell align="center" width={'auto'}>{row.email}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{row.role}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{row.createdAt}</TableCell>
                                    <TableCell align="center" sx={{ width: '10%', whiteSpace: 'nowrap' }}><EditOutlinedIcon /> <DeleteForeverOutlinedIcon /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
