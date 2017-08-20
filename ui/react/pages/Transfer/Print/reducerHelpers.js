import immutable from 'immutable';
import { methodRequestState } from 'ut-front-react/constants';

import { getIbanInfo } from '../helpers';

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
        const sourceIban = action.result.data.sourceIban;
        const ibanInfo = getIbanInfo(sourceIban);
        action.result.data.sourceBIC = ibanInfo.bic;
        state = state.setIn([transferType, transferId], immutable.fromJS(action.result));
    }
    return state;
};
