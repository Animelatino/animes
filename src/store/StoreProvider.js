import React, { createContext, useContext, useReducer } from 'react';
import storeReducer, { initialStore } from './StoreReducer';

const StoreContext = createContext(initialStore);

const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider value={useReducer(storeReducer, initialStore)}>
            {children}
        </StoreContext.Provider>
    )
}

const useStore = () => useContext(StoreContext)[0];
const useDispatch = () => useContext(StoreContext)[1];

export { StoreContext, useStore, useDispatch }
export default StoreProvider;