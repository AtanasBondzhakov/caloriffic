import { Link } from "react-router";

import styles from '../navbar-item/NavbarItem.module.css';

export default function NavbarItem({
    path,
    name,
    icon,
    auth
}) {
    const itemClass = `${styles.item} ${auth === false ? styles['no-auth'] : ''}`

    return (
        <li className={itemClass}>
            {icon}
            <Link to={path}>{name}</Link>
        </li>
    );
};