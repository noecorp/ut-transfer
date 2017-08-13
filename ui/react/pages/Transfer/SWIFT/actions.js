import * as actionTypes from './actionTypes';

export const setErrors = (params) => ({
    type: actionTypes.SET_ERRORS,
    params
});

export const changeField = (key, value, data) => {
    return {
        type: actionTypes.CHANGE_FIELD,
        key,
        value,
        data
    };
};

export const fetchNomenclatures = (params) => {
    return {
        type: actionTypes.FETCH_NOMENCLATURES,
        method: 'core.itemName.fetch',
        params: {alias: ['country', 'currency']}
    };
};

export const sendMessage = () => {
    return {
        type: actionTypes.SEND_MESSAGE,
        method: 'transfer.onlineBanking.transfer.requestOTP',
        params: null
    }
}