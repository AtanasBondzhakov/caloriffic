import styles from './DailyIncomeList.module.css';

export default function DailyIncomeList({
    daily
}) {
    console.log(daily);

    return (
        <div className={styles['daily-total']}>
            <p>List of Daily Income Calories</p>

            {daily.products.map(product => (
                <div className={styles.info}>
                    <p>{product.name}</p>
                    <div className={styles.nutri}>
                        <span>{product.calories}</span>
                        <span>{product.carbohydrates}</span>
                        <span>{product.proteins}</span>
                        <span>{product.fats}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};