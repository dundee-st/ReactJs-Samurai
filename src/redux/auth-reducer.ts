import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean,
    captchaUrl: string | null  //если ноль, каптча не обязательна
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: true,
    isAuth: false,
    captchaUrl: null as string | null  //если ноль, каптча не обязательна
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                userzsd: 'sdsd', //косяк
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            break;
    }

    return state;
}
type setUserAuthDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type setUserAuthDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setUserAuthDataActionPayloadType
}
export const setUserAuthData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserAuthDataActionType => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
});

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });


export const getUserData = () => async (dispatch: any) => {

    let response = await authAPI.giveMe()

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
};

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());         //диспатчим санку
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('login', { _error: message }));          //stopSubmit - action из редакс-форм, указываем назване формы, вторым параметром ошибочное поле
    }

};

export const logOut = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false))
    }
};


export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;