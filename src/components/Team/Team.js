import React from "react";

import './Team.css'

export default function Team({ name = 'Name', topic = 'Topic', project = 'Project', members }) {

    return (
        <div className='team-container'>
            <h1>{name}</h1>
            <hr/>
            <h3>Topic: {topic}</h3>
            <h3>Project: {project}</h3>
            <ul>
                <li>
                    <div className='img-container'>
                        <img
                            src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                            alt=""/>
                    </div>
                    <p>Vahe</p>
                </li>
                <li>
                    <div className='img-container'>
                        <img
                            src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                            alt=""/>
                    </div>
                    <p>Vahe</p>
                </li>
                <li>
                    <div className='img-container'>
                        <img
                            src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                            alt=""/>
                    </div>
                    <p>Vahe</p>
                </li>
                <li>
                    <div className='img-container'>
                        <img
                            src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                            alt=""/>
                    </div>
                    <p>Vahe</p>
                </li>
            </ul>
        </div>
    )
}