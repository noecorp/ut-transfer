import immutable from 'immutable';
import { methodRequestState } from 'ut-front-react/constants';

import { getIbanInfo } from '../helpers';

const parseTransferGetResult = (result) => {
    const sourceIban = result.data.sourceIban;
    const ibanInfo = getIbanInfo(sourceIban);
    result.data.sourceBIC = ibanInfo.bic;
    result.data.amount = Number(result.data.amount).toFixed(2);
    return result;
};

export const setActiveTab = (state, action, options) => {
    return state.set('activeTabData', immutable.Map({
        transferType: action.params.transferType,
        transferId: action.params.transferId
    }));
};

export const getTransfer = (state, action, options) => {
    const { transferType, transferId } = options;
    if (action.methodRequestState === methodRequestState.REQUESTED) {
        state = state.setIn([transferType, transferId], immutable.Map());
    }
    if (action.methodRequestState === methodRequestState.FINISHED) {
        let parsedResult = parseTransferGetResult(action.result);
        state = state.setIn([transferType, transferId], immutable.fromJS(parsedResult));
    }
    return state;
};
