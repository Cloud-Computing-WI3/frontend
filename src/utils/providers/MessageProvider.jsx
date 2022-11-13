import React, {createContext, useContext, useState} from "react";
const defaultMessage = {
    status: undefined,
    text: "",
    code: 0,
    show: false
};
export const MessageContext = createContext(null);

function MessageProvider(props) {
    const [message, setMessage] = useState(defaultMessage);
    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {props.children}
        </MessageContext.Provider>
    );
}

const useMessage = () => {
    return useContext(MessageContext);
};
export {MessageProvider, useMessage};