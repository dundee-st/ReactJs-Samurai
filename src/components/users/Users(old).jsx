import React from 'react';
import styles from './users.module.css'
import Axios from 'axios';
import userPhtot from '../../img/user.jpg'

let Users = (props) => {
    // let getUsers = () => {

    if (props.users.length === 0) {

        Axios.get('https://social-network.samuraijs.com/api/1.0/users')
            // .then(response => response.json())
            .then(response => {
                // console.log(data);
                props.setUsers(response.data.items);
            })

    }
    // }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhtot} className={styles.usersPhoto} alt='avatar' />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )

}

export default Users;