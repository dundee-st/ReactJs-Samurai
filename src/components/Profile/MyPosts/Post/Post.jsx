import React from 'react';
import s from './Post.module.css';

const Post = props => {
    return (
        <div className={s.item}>
            <img
                className={s.img}
                src="https://habrastorage.org/webt/5c/e7/b6/5ce7b646a2494426597912.jpeg"
                alt="avatar"
            />
            <div className={s.postBlock}>
                <p>{props.message}</p>
                <div className={s.likeBlock}>
                    <img
                        className={s.like}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Facebook_like_thumb.png/700px-Facebook_like_thumb.png"
                        alt=""
                    />
                    <span>{props.likes}</span>
                </div>
            </div>
        </div>
    );
};
export default Post;
