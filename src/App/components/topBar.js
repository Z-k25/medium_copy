import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/currentUser'

const TopBar = () => {
    const [{ isLogedOn, currentUser }] = useContext(CurrentUserContext)
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    Medium
                </NavLink>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" exact>
                            Home
                        </NavLink>
                    </li>
                    {!isLogedOn &&
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Sign in
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                    Sign up
                                </NavLink>
                            </li>
                        </Fragment>}
                    {isLogedOn &&
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/articles/new" className="nav-link" exact>
                                    <i className="ion-compose" />
                                    &nbsp; New Post
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/profile/${currentUser.id}`} className="nav-link" exact>
                                    <img className="user-pic" src={currentUser.image} alt="" />
                                    &nbsp; {currentUser.username}
                                </NavLink>
                            </li>
                        </Fragment>}
                </ul>
            </div>
        </nav>
    )
}

export default TopBar