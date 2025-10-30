import styles from './DailyIncomeList.module.css';

import { totalsCalc } from '../../../utils/calcs';

export default function DailyIncomeList({
    daily
}) {
    const totals = totalsCalc(daily.products);

    return (
        <div className={styles['daily-total']}>
            <h2>Daily Income Calories</h2>

            {!daily && <h3 className={styles.empty}>Your product list it empty.</h3>}
            {daily && <>
                <div className={styles.header}>
                    <div className={styles['header-labels']}>
                        <p>Product</p>
                        <div className={styles['header-nutri']}>
                            <p>Qty/g</p>
                            <p>Kcal</p>
                            <p>Carbs</p>
                            <p>Proteins</p>
                            <p>Fats</p>
                        </div>
                    </div>
                </div>

                {daily?.products?.map(product => (
                    <div key={product._id} className={styles.info}>
                        <div className={styles['product-info']}>
                            <p>{product.name}</p>
                            <div className={styles['product-nutri']}>
                                <span>{product.quantity}</span>
                                <span>{product.calories}</span>
                                <span>{product.carbohydrates}</span>
                                <span>{product.proteins}</span>
                                <span>{product.fats}</span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={styles.total}>
                    <p>Total:</p>
                    <div className={styles['total-qty']}>
                        <span>{totals.quantity}</span>
                        <span>{totals.calories}</span>
                        <span>{totals.carbohydrates}</span>
                        <span>{totals.proteins}</span>
                        <span>{totals.fats}</span>
                    </div>
                </div>
            </>}
        </div>
    );
};