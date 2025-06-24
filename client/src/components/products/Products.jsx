import Search from "../search/Search";

import styles from '../products/Products.module.css';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Products() {
    return (
        <div className={styles.container}>
            <Search />

            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#5380bb' }}>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Calories</TableCell>
                                <TableCell>Carbohydrates</TableCell>
                                <TableCell>Proteins</TableCell>
                                <TableCell>Fats</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align="center" sx={{ width: 'auto' }}></TableCell>
                                <TableCell align="center" width={'auto'}></TableCell>
                                <TableCell align="center" sx={{ width: 'auto' }}></TableCell>
                                <TableCell align="center" sx={{ width: 'auto' }}></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
