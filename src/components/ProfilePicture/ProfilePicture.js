import React from "react";

import './ProfilePicture.css'

function ProfilePicture({ avatarUrl }) {
    return (
        <div className='profile-picture-container'>
            <div className='picture-container'>
                <img src={avatarUrl} alt=""/>
            </div>
        </div>
    )
}

export default ProfilePicture;