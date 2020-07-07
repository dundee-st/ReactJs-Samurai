import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING = 'TOOGLE_IS_FOLLOWING';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
};
export type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }

                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        case SET_USERS: {
            return { ...state, users: [...action.users] }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_COUNT: {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case TOOGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOOGLE_IS_FOLLOWING: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }

        default:
            break;
    }

    return state;
}

type FollowSuccessActionType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType> }
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });

type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_COUNT, totalUsersCount: number }
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_COUNT, totalUsersCount });

type ToogleIsFetchingActionType = { type: typeof TOOGLE_IS_FETCHING, isFetching: boolean }
export const toogleIsFetching = (isFetching: boolean): ToogleIsFetchingActionType => ({ type: TOOGLE_IS_FETCHING, isFetching });

type ToogleFollowingActionType = { type: typeof TOOGLE_IS_FOLLOWING, followingInProgress: boolean, userId: number }
export const toogleFollowing = (followingInProgress: boolean, userId: number): ToogleFollowingActionType => ({ type: TOOGLE_IS_FOLLOWING, followingInProgress, userId });

export const getUserThunkCreator = (page: number, pageSise: number) => {   //создаем thukn креатор который пирнимает параметры

    return async (dispatch: any) => {      //сам thunk

        dispatch(toogleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response = await usersAPI.getUsers(page, pageSise);

        dispatch(toogleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}


const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {              //функция рефакторинга(сократили код follow/unfollow санок)

    dispatch(toogleFollowing(true, userId));

    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toogleFollowing(false, userId));
}


export const follow = (userId: number) => {   //создаем thunk креатор который пирнимает параметры

    return async (dispatch: any) => {      //сам thunk       

        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccess;

        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const unfollow = (userId: number) => {   //создаем thunk креатор который пирнимает параметры

    return async (dispatch: any) => {      //сам thunk

        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = unfollowSuccess;

        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export default usersReducer;