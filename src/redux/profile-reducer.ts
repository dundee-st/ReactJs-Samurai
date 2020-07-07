import { usersAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PostDataType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO = "SAVE_PHOTO";


let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likes: 15 },
        { id: 2, message: "It's my first post", likes: 37 },
        { id: 3, message: 'Wazzzzaaaaaaaaa', likes: 42 }
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: ''
}
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost]
            };

        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            };
        }
        case SAVE_PHOTO: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }
        default:
            break;
    }

    return state;
}
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })

type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO, photos: PhotosType }
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO, photos })

export const getUserProfile = (userId: number) => async (dispatch: any) => {           //thunk creator
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {           //thunk creator
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {           //thunk creator
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {           //thunk creator
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {           //thunk creator
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));          //stopSubmit - action из редакс-форм, указываем назване формы, вторым параметром ошибочное поле
        return Promise.reject(response.data.messages[0]);
    }
}
export default profileReducer;