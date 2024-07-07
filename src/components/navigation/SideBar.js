import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-dom';
import "./navigation.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';

const SideBar = () => {
    // set state for the sidebar

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
