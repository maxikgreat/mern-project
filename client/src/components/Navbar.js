import React, { useContext } from 'react';
import {NavLink, Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () =>{
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }  

    return (
        <nav>
            <div className="nav-wrapper" style={{padding: '0 10px 0 10px'}}>
                <Link to="/" className="brand-logo">Short link</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}