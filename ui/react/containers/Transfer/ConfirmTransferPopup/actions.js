import * as actionTypes from './actionTypes';

export const editConfirmTransferPopupField = ({ field, value, data }) => ({
    type: actionTypes.EDIT_CONFIRM_TRANSFER_POPUP_FIELD,
    params: { field, value, data }
});

export const resetConfirmTransferPopupState = () => ({
    type: actionTypes.RESET_CONFIRM_TRANSFER_POPUP_STATE
});

export const setConfirmTransferPopupErrors = (errors) => ({
    type: actionTypes.SET_CONRIFM_TRANSFER_POPUP_ERRORS,
    params: { errors }
});
