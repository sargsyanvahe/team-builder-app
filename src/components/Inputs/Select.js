import React from "react";

import './Inputs.css'


export default function Select({disabled, name, onChange, value, options,error }) {
    return (
        <div className='input-container'>
            <select disabled={disabled} className='input' name={name} onChange={onChange} value={value}>
                <option value="">None</option>
                {options && options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>
            <span className='error-message' style={{color: !error && 'gray'}}>Select Company</span>
        </div>
    )
}