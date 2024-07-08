import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./navigation.css"

import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';
import Button from '../general/Button';

const SideBar = () => {
    // set state for the sidebar
    const [selected, setSelected] = useState('home');
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);
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

    useEffect(() => {
        const fetchActivities = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/api/activity', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const handleMouseEnter = () => {
        setSmall(false); // Expand the sidebar on hover
        setShowActivities(false);
    };

    const handleMouseLeave = () => {
        setSmall(true); // Collapse the sidebar when hover ends
        setShowActivities(true);
    };

    return (
        <nav className={`sidebar ${small ? 'collapsed' : 'expanded'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ul className='nav-ul'>
                <li className={`side-nav-item ${selected === 'Home' ? 'selected' : ''}`} onClick={() => setPage('Home')} >
                    <Button
                        label={!small ? "Home " : ""}
                        icon={faFolder}
                        endIcon={!small && selected === 'Home' ? faArrowRight : null} // Conditionally render endIcon
                        // onClick={() => setPage('Home')}
                        className='side-nav-button'
                    />
                </li>
                <li className={`side-nav-item ${selected === 'Favorites' ? 'selected' : ''}`}>
                    <Button
                        label={!small ? "Favorites " : ""}
                        icon={faStar}
                        endIcon={!small ? faArrowRight : null} // Conditionally render endIcon
                        onClick={() => setPage('Favorites')}
                        className='side-nav-button'
                    />
                </li>
                <li className={`side-nav-item ${selected === 'watchlater' ? 'selected' : ''}`}>
                    <Button
                        label={!small ? "Watch Later " : ""}
                        icon={faClock}
                        endIcon={!small ? faArrowRight : null} // Conditionally render endIcon
                        onClick={() => setPage('Watch Later')}
                        className='side-nav-button'
                    />
                </li>
            </ul>
            {!small && (
                <ul className='activity-ul'>
                    {activities.slice(0, 10).map((activity, index) => (
                        <Activity
                            key={index}
                            user={activity.user.username}
                            title={activity.title.title}
                            activityType={activity.activityType === 'Favorite' ? { favorite: true } : { watchlater: true }}
                            date={activity.createdAt}
                        />
                    ))}
                </ul>
            )}
        </nav>
    );

};

export default SideBar;
