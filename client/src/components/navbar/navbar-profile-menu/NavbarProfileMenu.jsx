import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Space } from 'antd';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { logoutUser } from '../../../store/slices/authSlice';

export default function NavbarProfileMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandle = async () => {
        await dispatch(logoutUser({ navigate })).unwrap();
    };

    const { isAuthenticated } = useSelector(state => state.auth);

    const items = [
        !isAuthenticated && {
            key: '1',
            label: (
                <Link to='/auth/login' style={{ fontSize: '1.2em', padding: '0.5em' }}>
                    Login
                </Link>
            ),
        },
        !isAuthenticated && {
            key: '2',
            label: (
                <Link to='/auth/register' style={{ fontSize: '1.2em', padding: '0.5em' }}>
                    Register
                </Link>
            ),
        },
        isAuthenticated && {
            key: '3',
            label: (
                <span style={{ fontSize: '1.2em', padding: '0.5em', cursor: 'pointer' }} onClick={logoutHandle}>
                    Logout
                </span>
            ),
        }
    ];

    return (
        <Dropdown menu={{ items }} placement='bottomLeft' className='dropdown'>
            <a onClick={e => e.preventDefault()}>
                <Space>
                    <FaRegUserCircle size='1.5em' color='#080808' />
                </Space>
            </a>
        </Dropdown>
    );
};