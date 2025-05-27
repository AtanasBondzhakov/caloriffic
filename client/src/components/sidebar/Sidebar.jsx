import styles from '../sidebar/Sidebar.module.css';
import logo from '/Logo-image.png';
import NavbarItem from '../navbar/navbar-item/NavbarItem.jsx';
import { useSelector } from 'react-redux';

const navLinks = [
    { path: '/', name: 'Home', requiresAuth: null },
    { path: '/auth/login', name: 'Login', requiresAuth: false },
    { path: '/auth/register', name: 'Register', requiresAuth: false },
    { path: '/calculator', name: 'Calculator', requiresAuth: null },
    { path: '/products', name: 'Products', requiresAuth: null },
];

export default function NewNav() {
    const { isAuthenticated } = useSelector(state => state.auth);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={styles.content}>
                    <div className={styles.user}>
                        <p>User Email</p>
                    </div>
                    <div className={styles.actions}>
                        <ul className={styles.list}>
                            {navLinks
                                .filter(link => link.requiresAuth === null || (isAuthenticated ? link.requiresAuth : link.requiresAuth === false))
                                .map(link => (
                                    <NavbarItem key={link.name} path={link.path} name={link.name} icon={link.icon} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.bottom}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
};