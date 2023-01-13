import React, {createContext, useContext, useState} from "react";
export const LoadingContext = createContext(null);

function LoadingProvider(props) {
    const [isLoading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    return (
        <LoadingContext.Provider value={{isLoading, setLoading, loadingMessage, setLoadingMessage}}>
            {props.children}
        </LoadingContext.Provider>
    );
}

const useLoader = () => {
    return useContext(LoadingContext);
};
export {LoadingProvider, useLoader};