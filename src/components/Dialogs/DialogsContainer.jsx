import React from 'react';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        // isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => { dispatch(sendMessageCreator(newMessageText)); }
    }
}
// compose(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs)
// let AuthRedirectComponent = withAuthRedirect(Dialogs);       //Hight Order Component (HOC)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs);
