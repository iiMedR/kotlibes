import React, { useState, useEffect, useRef } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Sidebar from './SideBar/Sidebar';
import { Link } from 'react-router-dom';

function NavDashboard() {
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef();
    const dropdownRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenProfile(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    const logOut = () => {
        secureLocalStorage.removeItem('n');
        secureLocalStorage.removeItem('e');
        secureLocalStorage.removeItem('au');
        secureLocalStorage.removeItem('i');
    };

    return (
        <div>
            <div className='dashboard-sidebar'>
                <Sidebar />
            </div>
            <div className='dashboard-navbar'>
                <button className='Avatar' ref={menuRef} onClick={() => setOpenProfile((prev) => !prev)}>
                    👋 {secureLocalStorage.getItem('n')}
                </button>
                {openProfile && (
                    <div className='Dropdownprofile' ref={dropdownRef}>
                        <ul>
                            <Link to="/settings" id="dropdown-link">
                                <li className='row' id={window.location.pathname === "/settings" ? "active" : ""}>
                                    <div>Settings</div>
                                </li>
                            </Link>
                            <Link to="/" id="dropdown-link">
                                <li
                                    className='row'
                                    id={window.location.pathname === "/" ? "active" : ""}
                                    onClick={logOut}
                                >
                                    <div>Logout</div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                )}
                <button className='wallet'>💰 wallet : {secureLocalStorage.getItem('t')}Kots</button>
            </div>
        </div>
    );
}

export default NavDashboard;
