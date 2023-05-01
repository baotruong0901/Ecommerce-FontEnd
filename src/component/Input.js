import React, { useState } from 'react';
import "../scss/Input.scss"
const Input = (props) => {
    const [focused, setFocused] = useState(false)
    const handleFocus = (e) => {
        setFocused(true)
    }
    return (
        <div className="form-group mb-2">
            {props.label && <label>{props.label}</label>}
            <input type={props.type}
                className="form-control"
                placeholder={props.placeholder}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                required
                pattern={props.pattern}
                onBlur={handleFocus}
                focused={focused.toString()}
            />
            <small className="form-text text-danger">{props.errorMessage}</small>
        </div>
    );
};

export default Input;