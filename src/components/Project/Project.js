import React from "react";
import Button from "../Button/Button";

import './Project.css'

export default function Project({ handleVote, votedByMe, id, title, description, votingsCount }) {

    const vote = () => {
        if (votedByMe) {
            handleVote(id, 'unlike')
        } else {
            handleVote(id, 'like')
        }
    };

    return (
        <div className='project-container'>

            <h1>{title}</h1>
            <div>
                <span style={{ fontStyle: 'italic' }}>Description:</span>
                <p style={{ fontSize: 20, margin: 0 }}>{description}</p>
            </div>
            <h3>Likes Count: {votingsCount}</h3>
            <Button onClick={vote} color='#2980b9'>{votedByMe ? 'Unlike' : 'Like'}</Button>
        </div>
    )
}