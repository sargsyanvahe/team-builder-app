import React from "react";
import loader from '../../assets/loading.svg'

import './Auth.css';

export default function Popup({ isOpened, processing, text }) {

    return (
        <div className={`popup-container ${isOpened && 'open'}`}>
            <div className='popup'>
                {processing ? <img src={loader} alt=""/> : <h2>{text}!</h2>}
            </div>
        </div>
    )
}
