import React from "react";

import './Inputs.css';

export default function InputRadio({ checked, name, onChange, disabled, value, text }) {
    return (
        <label className="radio-container">{text}
            <input type="radio" value={value} disabled={disabled} onChange={onChange} checked={checked} name={name}/>
            <span className="checkmark"/>
        </label>
    )
}