// src/components/navigation/Header.js
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './navigation.css'

const Header = ({userUsername, setIsLoggedIn}) => {

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <nav className='nav-bar'>
            <h2 className="nav-title">Cinema Guru</h2>
            <div className="nav-user">
            <img src="https://picsum.photos/50/50" alt="User Avatar" className="nav-img" />
            <p className="nav-greeting">Welcome {userUsername}!</p>
            <span className='exit-icon' onClick={logout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
            </span>
            </div>

        </nav>
    );
};

Header.propTypes = {
    userUserName: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default Header;
