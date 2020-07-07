import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile-reducer(reserv js)";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: 'Hi, how are you?', likes: 15 },
                { id: 2, message: "It's my first post", likes: 37 },
                { id: 3, message: 'Wazzzzaaaaaaaaa', likes: 42 }
            ],
            newPostText: "this is new post"
        },
        messagesPage: {
            dialogsData: [
                { id: 1, name: 'Stas' },
                { id: 2, name: 'Snegana' },
                { id: 3, name: 'Andrey' },
                { id: 4, name: 'Denis' },
                { id: 5, name: 'Anna' }
            ],
            messagesData: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'I am here!' },
                { id: 3, message: 'How are you?' }
            ],
            newMessageText: ''
        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {
        console.log('state changed');
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }
}


export default store;
window.store = store;
