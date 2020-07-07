const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    dialogsData: [
        { id: 1, name: 'Stas' },
        { id: 2, name: 'Snegana' },
        { id: 3, name: 'Andrey' },
        { id: 4, name: 'Denis' },
        { id: 5, name: 'Anna' }
    ] as Array<DialogType>,
    messagesData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'I am here!' },
        { id: 3, message: 'How are you?' }
    ] as Array<MessageType>
}
export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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
type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageText: string
}
export const sendMessageCreator = (newMessageText: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageText })

export default dialogsReducer;