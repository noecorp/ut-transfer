import * as actionTypes from './actionTypes';

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
    method: 'transfer.onlineBanking.transfer.create'
});
