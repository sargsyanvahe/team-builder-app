import React from "react";
import Button from "../Button/Button";

import './Topic.css'

export default function Topic({ canDelete,handleDelete,votingsCount, handleVote, votedByMe, id, title }) {

    const vote = () => {
        if (votedByMe) {
            handleVote(id, { type: 'unlike' })
        } else {
            handleVote(id, { type: 'like' })
        }
    };

    return (
        <div className='topic-container'>
            <h1>{title}</h1>
            <div>
                Likes: {votingsCount}
                <Button onClick={vote} color='#2980b9'>{votedByMe ? 'Unlike' : 'Like'}</Button>
                {canDelete && <Button onClick={()=>handleDelete(id)} color='#e74c3c'>Delete</Button>}
            </div>
        </div>
    )
}