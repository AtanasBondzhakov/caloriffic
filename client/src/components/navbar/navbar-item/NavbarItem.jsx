import { Link } from "react-router";

export default function NavbarItem({
    path,
    name
}) {
    return (
        <li className='nav-item'>
            <Link to={path}>{name}</Link>
        </li>
    );
};