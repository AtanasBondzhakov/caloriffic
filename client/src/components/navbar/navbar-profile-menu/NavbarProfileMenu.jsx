import React from 'react';
import { Dropdown, Space } from 'antd';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router';
const items = [
    {
        key: '1',
        label:(
            <Link to='/sign-in' style={{fontSize: '1.2em', padding: '0.5em'}}>
                Sign In
            </Link>
        ),
    },
    {
        key: '2',
        label:(
            <Link to='/sign-up' style={{fontSize: '1.2em', padding: '0.5em'}}>
                Sign Up
            </Link>
        ),
    }
];

export default function NavbarProfileMenu() {
    return (
        <Dropdown menu={{ items }} placement='bottomLeft' className='nav-item'>
            <a onClick={e => e.preventDefault()}>
                <Space>
                    <FaRegUserCircle size='1.5em' color='#fff'/>
                </Space>
            </a>
        </Dropdown>
    );
};