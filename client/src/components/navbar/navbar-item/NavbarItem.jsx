import { Link } from "react-router";

import styles from '../navbar-item/NavbarItem.module.css';

export default function NavbarItem({
    path,
    name,
    icon
}) {
    return (
        <li className={styles.item}>
            {icon}
            <Link to={path}>{name}</Link>
        </li>
    );
};