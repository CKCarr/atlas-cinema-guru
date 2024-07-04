// src/components/general/Input.js

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';


const Input = ({
    label = '',
    type,
    className = '',
    value,
    setValue,
    icon = null,
    inputAttributes = {},
}) => {
    const handleInput = (onchangeEvent) => {
        setValue(onchangeEvent.target.value);
    };

    return (
        <div className={`input-container ${className}`}>
                {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
                {label && <label className="label">{label}</label>}
                <input
                type={type}
                value={value}
                onChange={handleInput}
                className='input-field'
                {...inputAttributes}
                />
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    icon: PropTypes.object,
    inputAttributes: PropTypes.object,
};

export default Input;

