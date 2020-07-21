import React from "react";

import './Team.css'

export default function Team({ name, topic, project, members }) {

    return (
        <div className='team-container'>
            <h1>{name}</h1>
            <hr/>
            <h3>Topic: {topic}</h3>
            <h3>Project: {project}</h3>
            <ul>
                {members && members.map(({ firstName, avatarUrl }) => <li key={Date.now()}>
                    <div className='img-container'>
                        <img
                            src={avatarUrl}
                            alt=""/>
                    </div>
                    <p>{firstName}</p>
                </li>)}
            </ul>
        </div>
    )
}