import React from 'react';
import '../../scss/customerInput.scss'

const CustomerInput = (props) => {
    const { type, label, value, handleChange, name, placeholder } = props
    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
            />
            <label >{label}</label>
        </div>
    );
};

export default CustomerInput;