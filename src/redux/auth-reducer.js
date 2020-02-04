import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';
const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            break;
    }

    return state;
}

export const setUserAuthData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getUserData = () => async (dispatch) => {

    let response = await authAPI.giveMe()

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
};

export const logIn = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getUserData());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('login', { _error: message }));          //stopSubmit - action из редакс-форм, указываем назване формы, вторым параметром ошибочное поле
    }

};

export const logOut = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false))
    }
};

export default authReducer;