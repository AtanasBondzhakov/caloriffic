import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import Input from '../forms/input/Input';

import styles from '../search/Search.module.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { clearSelectedProduct, getProducts } from '../../store/slices/productsSlice';

export default function Search({
    onSearching
}) {
    const dispatch = useDispatch();

    const { values, errors, handleChange, handleSubmit } = useForm({ search: '' }, searchHandler);

    function searchHandler() {
        dispatch(getProducts(values.search));
        dispatch(clearSelectedProduct());
        onSearching();
    }

    return (
        <div className={styles.container}>
            <form className={styles['search-form']} onSubmit={handleSubmit}>
                <Input
                    className={styles['search-field']}
                    name='search'
                    value={values.search}
                    onChange={handleChange}
                    label='Search'
                />
                <button type='submit' className={styles['search-button']}><SearchOutlinedIcon /></button>
            </form >

        </div>
    );
};
