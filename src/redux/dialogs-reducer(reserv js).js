const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let messageText = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 4, message: messageText }]
            };
        }

        default:
            break;
    }

    return state;
}

export const sendMessageCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText })

export default dialogsReducer;