import Input from '../../forms/input/Input';
import CustomButton from '../../ui/custom-button/CustomButton';
import styles from './ProductDetails.module.css';

export default function ProductDetails({
    selected,
    values,
    handleChange,
    handleSubmit
}) {
    return (
        <>
            {!selected && (
                <div className={styles['no-product']}>
                    <h3 className={styles['not-selected']}>Not selected product yet</h3>
                </div>
            )}
            {selected && (
                <div className={styles['product-result']}>
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
                        <CustomButton
                            className={styles['custom-btn']}
                            label='Add Product'
                            handleClick={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
