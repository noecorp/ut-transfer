import * as actionTypes from './actionTypes';

export const setActiveTab = ({ mode, id }) => ({
    type: actionTypes.SET_ACTIVE_TAB,
    params: { mode, id }
});

export const setErrors = (errors) => ({
    type: actionTypes.SET_ERRORS,
    params: { errors }
});

export const editConfirmTransferPopupField = ({ field, value }) => ({
    type: actionTypes.EDIT_CONFIRM_TRANSFER_POPUP_FIELD,
    params: { field, value }
});

export const resetConfirmTransferPopupState = () => ({
    type: actionTypes.RESET_CONFIRM_TRANSFER_POPUP_STATE
});

export const getScreenConfiguration = (key) => ({
    type: actionTypes.GET_SCREEN_CONFIGURATION,
    method: 'user.screenConfiguration.get',
    params: { key }
});

export const fetchCustomerData = () => ({
    type: actionTypes.FETCH_CUSTOMER_DATA,
    method: 'transfer.onlineBanking.customerData.fetch'
});

export const fetchAccounts = () => ({
    type: actionTypes.FETCH_ACCOUNTS,
    method: 'transfer.onlineBanking.account.fetch'
});

export const createTransfer = (params) => ({
    type: actionTypes.CREATE_TRANSFER,
    method: 'transfer.onlineBanking.transfer.create'
});

export const editTransferField = ({ field, value }) => ({
    type: actionTypes.EDIT_TRANSFER_FIELD,
    params: { field, value }
});