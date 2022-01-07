const types = {
    updateUser: 'update - user',
    updateToken: 'update - token',
    updateHistorySearch: 'update - history - search',
    updateNetworkDetect: 'update - network',
    updateConfig: 'update - config',
    updateOrientation: 'update - orientation',
    updateFavorite: 'update - favorite',
    updateSuscribe: 'update - suscribe',
    updatetimeAfterAds: 'update - timeAds',
};

const initialStore = {
    user: {},
    token: null,
    historySearch: [],
    banner: 'ca-app-pub-5211659094025398/4752400475',
    intersticial: 'ca-app-pub-5211659094025398/6445767852',
    bonificado: 'ca-app-pub-5211659094025398/7123714260',
    networkDetect: true,
    config: {},
    orientation: null,
    favorite: [],
    suscribe: [],
    timeAfterAds: null,
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.updateUser:
            return {
                ...state,
                user: action.data,
            };
        case types.updateToken:
            return {
                ...state,
                token: action.data,
            };
        case types.updateHistorySearch:
            return {
                ...state,
                historySearch: action.data,
            };
        case types.updateNetworkDetect:
            return {
                ...state,
                networkDetect: action.data,
            };
        case types.updateConfig:
            return {
                ...state,
                config: action.data,
            };
        case types.updateOrientation:
            return {
                ...state,
                orientation: action.data,
            };
        case types.updateFavorite:
            return {
                ...state,
                favorite: action.data,
            };
        case types.updateSuscribe:
            return {
                ...state,
                suscribe: action.data,
            };
        case types.updatetimeAfterAds:
            return {
                ...state,
                timeAfterAds: action.data,
            };
        default:
            return state;
    }
};

export { initialStore, types };
export default storeReducer;
