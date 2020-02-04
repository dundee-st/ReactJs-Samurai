import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { usersAPI } from '../../api/api';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.myUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
        // if (!this.props.isAuth) return <Redirect to={'/login'} />  //редирект если не залогинены

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        );
    }
};
let mapStateToProps = (state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myUserId: state.auth.userId,
    isAuth: state.auth.isAuth

}));

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer); // Hight Order Component (HOC)

// let withUrlDataProfileContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfile })(withUrlDataProfileContainerComponent);
export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter
)(ProfileContainer);