import * as actionTypes from './actionTypes';

export const setActiveTab = ({ mode, id }) => ({
    type: actionTypes.SET_ACTIVE_TAB,
    params: { mode, id }
});

export const setTransferBudgetCreateData = (data) => ({
    type: actionTypes.SET_TRANSFER_BUDGET_CREATE_DATA,
    params: { data }
});

export const setErrors = (errors) => ({
    type: actionTypes.SET_ERRORS,
    params: { errors }
});

export const getScreenConfiguration = (key) => ({
    type: actionTypes.GET_SCREEN_CONFIGURATION,
    method: 'user.screenConfiguration.get',
    params: { key }
});

export const fetchAccounts = () => ({
    type: actionTypes.FETCH_ACCOUNTS,
    method: 'transfer.onlineBanking.account.fetch'
});

export const createTransfer = (params) => ({
    type: actionTypes.CREATE_TRANSFER,
    method: 'transfer.onlineBanking.transfer.create',
    params: { ...params, transferType: 'budget' }
});

export const getTransfer = (transferId) => ({
    type: actionTypes.GET_TRANSFER,
    method: 'transfer.onlineBanking.transfer.get',
    params: { transferId }
});

export const editTransferField = ({ field, value, data }) => ({
    type: actionTypes.EDIT_TRANSFER_FIELD,
    params: { field, value, data }
});

export const resetTransferState = () => ({
    type: actionTypes.RESET_TRANSFER_STATE
});

export const fetchTemplates = () => ({
    type: actionTypes.FETCH_TEMPLATES,
    method: 'transfer.onlineBanking.transferTemplate.fetch',
    params: { type: 'budget' }
});

export const createTemplate = ({ name, data }) => ({
    type: actionTypes.CREATE_TEMPLATE,
    method: 'transfer.onlineBanking.transferTemplate.create',
    params: { type: 'budget', name, data }
});

export const applyTemplate = (templateIndex) => ({
    type: actionTypes.APPLY_TEMPLATE,
    params: { templateIndex }
});

export const requestOTP = (bank, recipient) => {
    return {
        type: actionTypes.REQUEST_OTP,
        method: 'transfer.onlineBanking.transfer.requestOTP',
        params: { bank, recipient }
    };
};
