import { useSelector } from "react-redux";

import Search from "../search/Search";

import styles from '../products/Products.module.css';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Products() {
    const { products } = useSelector(state => state.products);

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
                                <TableCell>Calories/kcal</TableCell>
                                <TableCell>Carbohydrates/g</TableCell>
                                <TableCell>Proteins/g</TableCell>
                                <TableCell>Fats/g</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {products.map(product => 
                                <TableRow key={product._id}>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.name}</TableCell>
                                    <TableCell align="center" width={'auto'}>{product.category}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.calories}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.carbohydrates}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.proteins}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.fats}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
