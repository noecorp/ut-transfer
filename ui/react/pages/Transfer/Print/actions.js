import * as actionTypes from './actionTypes';

export const setActiveTab = ({ transferType, transferId }) => ({
    type: actionTypes.SET_ACTIVE_TAB,
    params: { transferType, transferId }
});

export const getTransfer = (transferId) => ({
    type: actionTypes.GET_TRANSFER,
    method: 'transfer.onlineBanking.transfer.get',
    params: { transferId }
});
