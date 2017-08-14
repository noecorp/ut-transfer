import * as actionTypes from './actionTypes';

export const requestOTP = (bank, recipient) => ({
    type: actionTypes.REQUEST_OTP,
    method: 'transfer.onlineBanking.transfer.requestOTP',
    params: {bank, recipient}
});
