import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Axios from 'axios';
import { logOut } from '../../redux/auth-reducer(reserv js)';

import Preloader from '../common/Preloader/Preloader';
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        )
    }
};
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, { logOut })(HeaderContainer);