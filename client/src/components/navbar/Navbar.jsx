import { Link } from "react-router";

import NavbarItem from "./navbar-item/NavbarItem.jsx";
import NavbarProfileMenu from "./navbar-profile-menu/NavbarProfileMenu.jsx";

const navLinks = [
    { path: '/', name: 'Home', requiresAuth: null },
    { path: '/calculator', name: 'Calculator', requiresAuth: null },
    { path: '/products', name: 'Products', requiresAuth: null },
    { path: '/auth/sign-up', name: 'Sign Up', requiresAuth: false },
];

export default function Navbar() {
    return (
        <div className='nav-container'>
            <div >
                <div className='nav-logo'>
                    <Link to='/'>Caloriffic</Link>
                </div>
            </div>
            <div className='nav-links'>
                <ul className='nav-link-items'>
                    {navLinks
                        .map(link => (
                            <NavbarItem key={link.name} path={link.path} name={link.name} />
                        ))
                    }
                </ul>
                <NavbarProfileMenu />
            </div>
        </div >
    );
};