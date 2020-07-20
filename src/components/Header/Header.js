import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SlideMenu from "./SlideMenu";

import logo from '../../assets/logo.png';

import './Header.css';

class Header extends React.PureComponent {

    state = {
        openedNavBar: false,
        openedSlide: false
    };

    handleBurgerClick = () => {
        this.setState(state => ({
            openedNavBar: !state.openedNavBar
        }))
    };

    toggleSlide = () => {
        this.setState(state => ({
            openedSlide: !state.openedSlide
        }))
    };

    render() {

        const { openedNavBar } = this.state;
        console.log(this.props.user.isLogged)

        return (
            <>
                <div className='header'>
                    <Link onClick={() => this.setState({ openedNavBar: false })} to={'/'}>
                        <img src={logo} alt=""/>
                    </Link>
                    <div className={`navbar-items ${openedNavBar ? 'opened' : ''}`}>
                        {this.props.user.isLogged &&
                        <>
                            <NavLink onClick={() => this.setState({ openedNavBar: false })}
                                     activeClassName='selected' to={`/teams`}>
                                Teams
                            </NavLink>
                            <NavLink onClick={() => this.setState({ openedNavBar: false })}
                                     activeClassName='selected' to={`/projects`}>
                                Projects
                            </NavLink>
                            <NavLink onClick={() => this.setState({ openedNavBar: false })}
                                     activeClassName='selected' to={`/topics`}>
                                Topics
                            </NavLink>
                            <img onClick={this.toggleSlide} className='header-profile-pic'
                                 src={this.props.user.avatarUrl}
                                 alt=""/>
                        </>
                        }
                    </div>
                    <div className={`burger ${openedNavBar ? 'opened-burger' : ''}`}
                         onClick={this.handleBurgerClick}>
                        <span className='first-span'/>
                        <span className='second-span'/>
                    </div>
                    <SlideMenu closeMenu={this.toggleSlide} open={this.state.openedSlide} onClick={this.toggleSlide}/>
                </div>
            </>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(withRouter(Header));