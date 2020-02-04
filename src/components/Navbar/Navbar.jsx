import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/profile" activeClassName={classes.active}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs" activeClassName={classes.active}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news" activeClassName={classes.active}>
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/music" activeClassName={classes.active}>
                        Music
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" activeClassName={classes.active}>
                        Find users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" activeClassName={classes.active}>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
