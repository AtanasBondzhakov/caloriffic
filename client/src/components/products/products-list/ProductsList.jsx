import Item from '../../ui/item/Item';
import styles from './ProductsList.module.css';

export default function ProductsList({
    products,
    onShowDetails
}) {
    return (
        <div className={styles['search-results']}>
            {products.map(product => (
                <Item
                    key={product.id}
                    className={styles.item}
                    onClickHandler={() => onShowDetails(product.id)}
                >
                    {product.name}
                </Item>
            ))}
        </div>
    );
};
