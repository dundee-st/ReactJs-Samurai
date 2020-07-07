import { createStore, combineReducers, applyMiddleware } from "redux";
import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile-reducer(reserv js)";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer(reserv js)";
import thunkMiddlewear from 'redux-thunk';
import { reducer as formReducer, reducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type reducerType = typeof reducers;
export type AppStateType = ReturnType<reducerType>

let store = createStore(reducers, applyMiddleware(thunkMiddlewear));
// @ts-ignore
window.store = store;

export default store;