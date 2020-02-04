import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likes: 15 },
        { id: 2, message: "It's my first post", likes: 37 },
        { id: 3, message: 'Wazzzzaaaaaaaaa', likes: 42 }
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
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
        default:
            break;
    }

    return state;
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getUserProfile = (userId) => async (dispatch) => {           //thunk creator

    let response = await usersAPI.getProfile(userId)

    dispatch(setUserProfile(response.data));

}
export const getStatus = (userId) => async (dispatch) => {           //thunk creator

    let response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data));

}
export const updateStatus = (status) => async (dispatch) => {           //thunk creator

    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }

}


export default profileReducer;