import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../products/Products.module.css';
import Search from "../search/Search";
import { getProductById } from "../../store/slices/productsSlice";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Products() {
    const dispatch = useDispatch();
    const { products, selected } = useSelector(state => state.products);

    const showProductDetails = useCallback(productId => {
        dispatch(getProductById(productId));
    }, [dispatch]);


    return (
        <div className={styles.container}>
            <Search />

            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#5380bb' }}>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                {/* <TableCell>Calories/kcal</TableCell>
                                <TableCell>Carbohydrates/g</TableCell>
                                <TableCell>Proteins/g</TableCell>
                                <TableCell>Fats/g</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {products.map(product => (
                                //ако е един продукт директно съвпадение не трябва да е масив и да има кий проп
                                <TableRow key={product.id} onClick={() => showProductDetails(product.id)}>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.name}</TableCell>
                                    {/* <TableCell align="center" sx={{ width: 'auto' }}>{product.calories}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.carbohydrates}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.proteins}</TableCell>
                                    <TableCell align="center" sx={{ width: 'auto' }}>{product.fats}</TableCell> */}
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
