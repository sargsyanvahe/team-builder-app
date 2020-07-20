import React from "react";

import './Inputs.css'

export default function InputDate({ value, onChange, name, disabled }) {
    return (
        <div className='input-date-container'>
            <span style={{ color: "gray" }}>Birth Date</span>
            <input
                type="date"
                disabled={disabled}
                name='birthDate'
                onChange={onChange}
                value={value}
            />
        </div>
    )
}