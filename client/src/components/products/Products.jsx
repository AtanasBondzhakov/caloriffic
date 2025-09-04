import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../products/Products.module.css';
import Search from "../search/Search";
import Item from "../ui/item/Item";
import CustomButton from "../ui/custom-button/CustomButton.jsx";
import Pagination from "../ui/pagination/Pagination.jsx";
import Input from "../forms/input/Input.jsx";

import { clearProducts, getProductById } from "../../store/slices/productsSlice";
import { useForm } from "../../hooks/useForm.js";
import { addProductToDaily } from "../../store/slices/dailyIntakeSlice.js";

export default function Products() {
    const dispatch = useDispatch();
    const { products, selected } = useSelector(state => state.products);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 30;
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(start, start + itemsPerPage);

    const showProductDetails = useCallback(productId => {
        dispatch(getProductById(productId));
    }, [dispatch]);

    const { values, handleChange, handleSubmit } = useForm({ quantity: 0 }, addProductToDailyHandler);

    async function addProductToDailyHandler(quantity) {
        dispatch(addProductToDaily({ productId: selected.id, quantity }));
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        return () => {
            dispatch(clearProducts());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles['search-container']}>
                <Search />

                {paginatedProducts.length > 0 && (
                    <>
                        <div className={styles['search-results']}>
                            {paginatedProducts.map(product => (
                                <Item
                                    key={product.id}
                                    className={styles.item}
                                    onClickHandler={() => showProductDetails(product.id)}
                                >
                                    {product.name}
                                </Item>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalItems={products.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={onPageChange}
                        />
                    </>
                )}
            </div>

            {!selected && (
                <div className={styles['no-product']}>
                    <h3 className={styles['not-selected']}>Not selected product yet</h3>
                </div>
            )}

            {selected && <div className={styles['product-result']}>
                <div className={styles['product-info']}>


                    <div className={styles['product-heading']}>
                        <h2>{selected.name}</h2>
                        <p>Information per 100g</p>
                    </div>
                    <div className={styles['product-nutri']}>
                        <p>Calories: <span>{selected.calories}</span></p>
                        <p>Carbohydrates: <span>{selected.carbohydrates}</span></p>
                        <p>Proteins: <span>{selected.proteins}</span></p>
                        <p>Fats: <span>{selected.fats}</span></p>
                    </div>
                    <Input
                        className={styles['input-form']}
                        type='number'
                        name='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                        label='Intake Quantity / g'
                    />
                    <CustomButton className={styles['custom-btn']} label='Add Product' handleClick={handleSubmit} />


                </div>
            </div>
            }
        </div>
    );
};
