import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img
                src="https://i.dlpng.com/static/png/4324051-group-of-people-in-a-formation-svg-png-icon-free-download-38224-icons-people-png-980_808_preview.png"
                alt="logo"
            />
            <div className={s.name}>
                <p>Social Network</p>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>
                        <span>{props.login} </span> <button onClick={props.logOut}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    );
};
export default Header;
