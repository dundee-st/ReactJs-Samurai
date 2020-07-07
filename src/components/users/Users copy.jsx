import React from 'react';
import styles from './users.module.css';
import userPhtot from '../../img/user2.png';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({ totalUsersCount, pageSise, currentPage, onPageChanged, users, followingInProgress, follow, unfollow, ...props }) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSise);
    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }
    // console.log(props.pageSise)
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSise={pageSise} />
            <div>
                {
                    users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />)
                }
            </div>
        </div>
    )
}

export default Users;