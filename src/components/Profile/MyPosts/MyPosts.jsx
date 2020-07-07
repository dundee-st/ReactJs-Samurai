import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import { TextArea } from '../../common/FormsControls/FormsControls';


const MyPosts = React.memo(props => {
    // let postData = props.myPosts;
    let postsElements = props.myPosts.map(element => (
        <Post
            message={element.message}
            key={element.id}
            likes={element.likes}
        />
    ));

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div>
            <div className={s.postBlock}>
                <h4>My posts</h4>
                <AddNewPostRedux onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
});

let maxLength20 = maxLengthCreator(20);

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name='newPostText' placeholder="Enter new post..."          //используем TexArea созданную вручную, с настроенной валидацией
                    validate={[required, maxLength20]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>

    )
}

const AddNewPostRedux = reduxForm({ form: "profilePostForm" })(MyPostsForm);

export default MyPosts;
