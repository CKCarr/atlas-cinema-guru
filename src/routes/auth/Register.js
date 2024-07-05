// src.routes/auth.Login.js

import React from 'react';
import PropTypes from 'prop-types';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './auth.css';

import Input from '../../components/general/Input';
import Button from '../../components/general/Button';

const Register = ({
    username = '',
    password = '',
    setUsername,
    setPassword,
}) => {
    return (
        <form className="login-container" >
        <h1 className="header" >Create a new account</h1>
        <Input
            icon={faUser}
            label="Username:"
            type="text"
            value={username}
            setValue={setUsername}
            inputAttributes={{}}
            className="login-input"
        />
        <Input
            icon={faKey}
            label="Password:"
            type="text"
            value={password}
            setValue={setPassword}
            inputAttributes={{
                placeholder: 'Enter your password',
                type: 'password',
            }}
            className="login-input"
        />
        <Button
            icon={faKey}
            label='Sign Up'
            onClick={() => console.log('Button clicked')}
            className="login-button"
        />
        </form>
    )
    
};

Register.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
};

export default Register;
