import * as actionTypes from './actionTypes';

export const setErrors = (params) => ({
    type: actionTypes.SET_ERRORS,
    params
});

export function changeField(key, value, data) {
    return {
        type: actionTypes.CHANGE_FIELD,
        key,
        value,
        data
    };
}
