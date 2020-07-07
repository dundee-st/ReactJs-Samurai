import { authAPI } from "../api/api";
// import { stopSubmit } from 'redux-form';
import { getUserData } from "./auth-reducer(reserv js)";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        default:
            break;
    }

    return state;
}
type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: SET_INITIALIZED });

export const initializeApp = () => (dispatch: any) => {

    let promise = dispatch(getUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    })

};



export default appReducer;