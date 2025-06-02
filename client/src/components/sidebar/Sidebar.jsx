import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from '../sidebar/Sidebar.module.css';
import logo from '/Logo-image.png';
import NavbarItem from '../navbar/navbar-item/NavbarItem.jsx';
import { logoutUser } from '../../store/slices/authSlice.js';
import { resetBodyMetrics } from '../../store/slices/bodyMetricsSlice.js';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const commonLinks = [
    { path: '/', name: 'Home', requiresAuth: null, icon: <HomeOutlinedIcon /> },
    { path: '/calculator', name: 'Calculator', requiresAuth: null, icon: <CalculateOutlinedIcon /> },
];

const guestLinks = [
    { path: '/auth/login', name: 'Login', requiresAuth: false },
    { path: '/auth/register', name: 'Register', requiresAuth: false },
];

const adminLinks = [
    { path: '/admin/manage-users', name: 'Manage users', requiresAuth: true },
];

const userLinks = [
    { path: '/user/profile', name: 'Profile', requiresAuth: true },

];

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);

    let navLinks = [...commonLinks];

    if (!isAuthenticated) {
        navLinks = [...navLinks, ...guestLinks];
    } else {
        if (user.role === 'admin') {
            navLinks = [...navLinks, ...adminLinks];
        } else {
            navLinks = [...navLinks, ...userLinks];
        }
    }

    const logoutHandle = async () => {
        await dispatch(logoutUser({ navigate })).unwrap();
        dispatch(resetBodyMetrics());
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={styles.content}>
                    <div className={styles.user}>
                        <p>{isAuthenticated ? `Welcome, ${user.email}` : 'Welcome, guest'}</p>
                    </div>
                    <div className={styles.actions}>
                        <ul className={styles.list}>
                            {navLinks
                                .filter(link => link.requiresAuth === null || (isAuthenticated ? link.requiresAuth : link.requiresAuth === false))
                                .map(link => (
                                    <NavbarItem
                                        key={link.name}
                                        path={link.path}
                                        name={link.name}
                                        icon={link.icon}
                                        auth={link.requiresAuth}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.bottom}>
                        {isAuthenticated && (
                            <>
                                <LogoutOutlinedIcon />
                                <button className={styles['logout-btn']} onClick={logoutHandle}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};