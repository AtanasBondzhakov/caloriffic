import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../products/Products.module.css';
import Search from "../search/Search";
import { clearProducts, getProductById } from "../../store/slices/productsSlice";
import Item from "../ui/item/Item";

export default function Products() {
    const dispatch = useDispatch();
    const { products, selected } = useSelector(state => state.products);

    const showProductDetails = useCallback(productId => {
        dispatch(getProductById(productId));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearProducts());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles['search-container']}>
                <Search />

                <div className={styles['search-results']}>
                    {products.map(product => (
                        <Item
                            key={product.id}
                            className={styles.item}
                            onClickHandler={() => showProductDetails(product.id)}
                        >
                            {product.name}
                        </Item>
                    ))}
                </div>

            </div>

            <div className={styles['product-result']}>
                <div className={styles['product-info']}>
                    {!selected && <h3>Not selected product yet</h3>}
                    {selected && (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
