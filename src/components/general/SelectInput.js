import React from 'react';
import PropTypes from 'prop-types';
import './general.css';

const SelectInput = ({
    label = '',
    options,
    className = '',
    value,
    setValue,
}) => {
    const handleSelect = (onchangeEvent) => {
        setValue(onchangeEvent.target.value);
    }

    return (
        <div className={`select-container ${className}`}>
            {label && <label className='label'>{label}</label>}
            <div>
                <select
                value={value}
                onChange={handleSelect}
                className={`select-field ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            </div>

        </div>
    )
};

SelectInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default SelectInput;
