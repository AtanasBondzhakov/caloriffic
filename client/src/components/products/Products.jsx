import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import styles from '../products/Products.module.css';
import Search from "../search/Search";
import Pagination from "../ui/pagination/Pagination.jsx";
import ProductsList from "./products-list/ProductsList.jsx";
import ProductDetails from "./product-details/ProductDetails.jsx";

import { clearProducts, clearSelectedProduct, getProductById } from "../../store/slices/productsSlice";
import { useForm } from "../../hooks/useForm.js";
import { addProductToDaily } from "../../store/slices/dailyIntakeSlice.js";
import Spinner from "../ui/spinner/Spinner.jsx";

export default function Products() {
    const dispatch = useDispatch();
    const { products, selected, loadingProducts, loadingSelected } = useSelector(state => state.products);
    const [isSearch, setIsSearch] = useState(false);
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
        dispatch(clearSelectedProduct());
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const onSearching = () => {
        setIsSearch(true);
    };

    useEffect(() => {
        return () => {
            dispatch(clearProducts());
            dispatch(clearSelectedProduct());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles['search-container']}>
                <Search onSearching={onSearching} />

                {loadingProducts && <Spinner />}

                {!loadingProducts && paginatedProducts.length > 0 && (
                    <>
                        <ProductsList
                            products={paginatedProducts}
                            onShowDetails={showProductDetails}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalItems={products.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={onPageChange}
                        />
                    </>
                )}

                {!loadingProducts && products.length === 0 && isSearch && (
                    <div className={styles['no-result']}>
                        <p>No food items match your search.</p>
                    </div>
                )}
            </div>

            <ProductDetails
                selected={selected}
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <ToastContainer />
        </div >
    );
};
