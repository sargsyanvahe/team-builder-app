import React from "react";
import { withRouter } from 'react-router-dom'
import "./Header.css";
import { connect } from "react-redux";
import { client } from "../../Client";
import { logoutFetch } from "../../redux/actions/user";

function SlideMenu({ open, closeMenu, onClick, fullName, logout, history }) {

    const handleLogout = () => {
        closeMenu();
        logout();
        client.removeToken();
        history.push('/login');
    };

    const handleEdit = () => {
        closeMenu();
        history.push('/profile')
    };

    return (
        <>
            <div onClick={onClick} className={`slide-container ${open && 'open'}`}/>
            <div className={`slide-menu ${open && 'open'}`}>
                <h2>{fullName}</h2>
                <button onClick={handleEdit} className='edit-profile-button'>Edit Profile</button>
                <button onClick={handleLogout} className='logout-button'>Log Out</button>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        fullName: `${state.user.firstName} ${state.user.lastName}`
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SlideMenu))