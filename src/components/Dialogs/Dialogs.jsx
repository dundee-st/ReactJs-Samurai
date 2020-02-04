import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Messages/Message';
import { Redirect } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = props => {
    let state = props.dialogsPage;
    // debugger;
    let dialogsElements = state.dialogsData.map(element => (
        <DialogItem name={element.name} key={element.id} id={element.id} />
    ));

    let messagesElements = state.messagesData.map(element => {
        return <Message message={element.message} key={element.id} id={element.id} />;
    });
    // let newMessageText = state.newMessageText;
    // let messegeInput = React.createRef();

    // if (!props.isAuth) return <Redirect to={'/login'} />;          //редирект если мы не залогинены

    let addNewMessages = (values) => {
        props.sendMessage(values.newMessageText);
    }
    return (
        <React.Fragment>
            <div className={s.dialogs}>
                <div className={s.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>
                        {messagesElements}
                    </div>
                    <AddMessageFormRedux onSubmit={addNewMessages} />
                </div>
            </div>

        </React.Fragment>
    );
};

let maxLength100 = maxLengthCreator(100);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name='newMessageText' placeholder="Enter your messages"
                    validate={[required, maxLength100]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessagesForm" })(AddMessageForm);

export default Dialogs;
