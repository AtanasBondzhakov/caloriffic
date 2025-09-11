import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './ProductDetails.module.css';
import Input from '../../forms/input/Input';
import CustomButton from '../../ui/custom-button/CustomButton';
import Spinner from '../../ui/spinner/Spinner.jsx';

export default function ProductDetails({
    selected,
    values,
    handleChange,
    handleSubmit
}) {
    const { loadingSelected } = useSelector(state => state.products);

    const previousSelectedRef = useRef(null);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (selected) {
            previousSelectedRef.current = selected;
        }
    }, [selected]);

    useEffect(() => {
        let timeout;

        if (loadingSelected) {
            timeout = setTimeout(() => {
                setShowSpinner(true)
            }, 300)

        } else {
            setShowSpinner(false);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [loadingSelected, showSpinner]);

    const displayProduct = loadingSelected ? previousSelectedRef.current : selected;

    if (!displayProduct) {
        return (
            <div className={styles['no-product']}>
                <h3 className={styles['not-selected']}>No product selected yet.</h3>
            </div>
        )
    }

    const nutrients = [
        { label: 'Calories', key: 'calories' },
        { label: 'Carbohydrates', key: 'carbohydrates' },
        { label: 'Proteins', key: 'proteins' },
        { label: 'Fats', key: 'fats' },
    ];

    return (
        <div className={styles['product-result']}>
            {showSpinner ? <Spinner />
                : (
                    <div className={styles['product-info']}>
                        <div className={styles['product-heading']}>
                            <h2>{selected.name}</h2>
                            <p>Information per 100g</p>
                        </div>
                        <div className={styles['product-nutri']}>
                            {nutrients.map(n => (
                                <p key={n.key}>
                                    {n.label}: <span>{selected[n.key]}</span>
                                </p>
                            ))}
                        </div>
                        <Input
                            className={styles['input-form']}
                            type='number'
                            name='quantity'
                            onChange={handleChange}
                            value={values.quantity}
                            label='Intake Quantity / g'
                        />
                        <CustomButton
                            className={styles['custom-btn']}
                            label='Add Product'
                            handleClick={handleSubmit}
                        />
                    </div>)}
        </div>
    );
};
