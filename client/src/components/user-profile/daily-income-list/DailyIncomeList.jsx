import styles from './DailyIncomeList.module.css';

export default function DailyIncomeList({
    daily
}) {
    console.log(daily);

    return (
        <div className={styles['daily-total']}>
            <h2>Daily Income Calories</h2>

            <div className={styles.header}>
                <div className={styles['header-labels']}>
                    <p>Product</p>
                    <div className={styles['header-nutri']}>
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
                            <span>{product.calories}</span>
                            <span>{product.carbohydrates}</span>
                            <span>{product.proteins}</span>
                            <span>{product.fats}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};