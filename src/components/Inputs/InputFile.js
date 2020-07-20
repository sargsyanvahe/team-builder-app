import React from "react";

import './Inputs.css'

export default function InputFile({ id, onChange, value, accept, name,error}) {
    return (
        <div className="file-container">
            <div className='file-name'>
                <div>
                    <input type="file" onChange={onChange} accept={accept} value={value} id={id} name={name}/>
                    <label htmlFor={id}>
                        <img src="https://image.flaticon.com/icons/png/512/3/3901.png" alt=""/>
                    </label>
                </div>
            </div>
            <span className='error-message'>{error && 'Please select photo'}</span>
        </div>
    )
}