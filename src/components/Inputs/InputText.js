import React from "react";

import './Inputs.css'

export default function InputText({ value,disabled, error, name, type, onChange, errorText, placeholder }) {
    return (
        <div className="input-container">
            <input className={`input ${error ? 'input-error' : ''}`}
                   value={value}
                   disabled={disabled}
                   onChange={onChange}
                   name={name}
                   placeholder={placeholder}
                   type={type}
            />
            <span className='error-message'>{errorText}</span>
        </div>
    )
}