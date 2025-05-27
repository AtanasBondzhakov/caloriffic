import styles from '../error-message/ErrorMessage.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorMessage({
    errors
}) {
    return (
        <div className={styles.errors}>
            {errors.map(err => <p key={err}><ErrorOutlineIcon color='error'/>{err}</p>)}
        </div>
    );
};