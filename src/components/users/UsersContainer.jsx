import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, setCurrentPage, toogleFollowing, getUserThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'C:/Users/Стас/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';
import { getUsers, getPageSise, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        let { currentPage, pageSise } = this.props;
        this.props.getUserThunkCreator(currentPage, pageSise);
        // })
    }
    onPageChanged = (pageNumber) => {
        let { pageSise } = this.props;
        this.props.getUserThunkCreator(pageNumber, pageSise);

    }

    render() {
        return <>
            {/* {this.props.isFetching ? <div>
                <Preloader />
            </div> : null} */}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSise={this.props.pageSise}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toogleFollowing={this.props.toogleFollowing}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSise: getPageSise(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSise: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }


// let mapDispatchToProps = (dispatch) => {               Диспатч как он работает, без сокращения.                      
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount));
//         },
//         toogleIsFetching: (isFetching) => {
//             dispatch(toogleIsFetchingAC(isFetching));
//         }
//     }
// }
// export default withAuthRedirect(connect(mapStateToProps,
//     {
//         follow, unfollow, setCurrentPage, toogleFollowing, getUserThunkCreator
//     })(UsersContainer));

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, toogleFollowing, getUserThunkCreator })
)(UsersContainer);