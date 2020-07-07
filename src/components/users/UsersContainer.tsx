import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, setCurrentPage, toogleFollowing, getUserThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'C:/Users/Стас/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';
import { getUsers, getPageSise, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';


type MapStatePropsType = {
    currentPage: number
    pageSise: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toogleFollowing: (followingInProgress: boolean, userId: number) => void
    getUserThunkCreator: (currentPage: number, pageSise: number) => void
}
type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let { currentPage, pageSise } = this.props;
        this.props.getUserThunkCreator(currentPage, pageSise);
        // })
    }
    onPageChanged = (pageNumber: number) => {
        let { pageSise } = this.props;
        this.props.getUserThunkCreator(pageNumber, pageSise);

    }

    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <div>
                <Preloader />
            </div> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSise={this.props.pageSise}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                // toogleFollowing={this.props.toogleFollowing}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
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
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { follow, unfollow, toogleFollowing, getUserThunkCreator })
)(UsersContainer);