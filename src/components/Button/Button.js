import React from "react";

import "./Button.css"


export default function Button({ onClick, children, color, disabled }) {
    return (
        <button
            onClick={onClick}
            className={`button ${disabled && 'disabled'}`}
            disabled={disabled}
            style={{ background: color  }}>{children}
        </button>
    )
}