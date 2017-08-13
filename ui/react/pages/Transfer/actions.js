import * as actionTypes from './actionTypes';

export const requestOTP = () => ({
    type: actionTypes.REQUEST_OTP,
    method: 'transfer.onlineBanking.transfer.requestOTP',
    params: null
});
