import immutable from 'immutable';

import * as actionTypes from './actionTypes';
import defaultState from './defaultState';
import * as reducerHelpers from './reducerHelpers';

const defaultStateImmutable = immutable.fromJS(defaultState);

export default function transferPrint(state = defaultStateImmutable, action) {
    const transferType = state.getIn(['activeTabData', 'transferType']);
    const transferId = state.getIn(['activeTabData', 'transferId']);
    const options = { transferType, transferId };
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return reducerHelpers.setActiveTab(state, action, options);
        case actionTypes.GET_TRANSFER:
            return reducerHelpers.getTransfer(state, action, options);
    }
    return state;
};
