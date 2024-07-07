import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./navigation.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';

const SideBar = () => {
    // set state for the sidebar
    const [selected, setSelected] = useState('home');
    const [small, setSmall] = useState(true);
    const [activities, setActiviteis] = useState([]);
    const [showActivities, setShowAvtivities] = useState(false);
    /** use navigate to  */
    const navigate = useNavigate();

    const setPage = (pageName) => {
        setSelected(pageName);
        let path;
        switch (pageName) {
            case 'Home':
                path = '/home';
                break;
            case 'Favorites':
                path = 'favorites';
                break;
            case 'Watch Later':
                path = 'watchlater';
                break;
            default:
                path = '/';
        }
        navigate(path);
    };

    return (
        <nav className='side-nav' >
            <ul className='side-list' >
                <li className='side-list-item'>
                    <FontAwesomeIcon icon={faFolder} className='side-icon' />
                </li>

                <li className='side-list-item' >
                    <FontAwesomeIcon icon={faStar} className='side-icon' />
                </li>

                <li className='side-list-item' >
                    <FontAwesomeIcon icon={faClock} className='side-icon' />
                </li>

            </ul>
            <div className='sidebar-activity-dash'>

            </div>
        </nav>
    );


};

SideBar.propTypes = {};

export default SideBar;
