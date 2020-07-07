import React from 'react';
import styles from './users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount: number
    pageSise: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({ totalUsersCount, pageSise, currentPage, onPageChanged, users, followingInProgress, follow, unfollow, ...props }) => {
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