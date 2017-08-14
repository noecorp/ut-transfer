import immutable from 'immutable';

import * as actionTypes from './actionTypes';
import * as transferSwiftReducers from './reducerHelpers';
import { defaultState } from './defaultState';

const defaultStateImmutable = immutable.fromJS(defaultState);

export default function transferSwift(state = defaultStateImmutable, action) {
    const activeTabMode = state.getIn(['activeTabData', 'mode']);
    const activeTabId = state.getIn(['activeTabData', 'id']);
    const options = { activeTabMode, activeTabId };
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return transferSwiftReducers.setActiveTab(state, action, options);
        case actionTypes.CHANGE_FIELD:
            return transferSwiftReducers.editTransferField(state, action, options);
        case actionTypes.SET_ERRORS:
            return transferSwiftReducers.setErrors(state, action, options);
        case actionTypes.FETCH_NOMENCLATURES:
            return transferSwiftReducers.fetchNomenclatures(state, action, options);
        case actionTypes.FETCH_ACCOUNTS:
            return transferSwiftReducers.fetchAccounts(state, action, options);
        case actionTypes.RESET_CONFIRM_TRANSFER_POPUP_STATE:
            return transferSwiftReducers.resetConfirmTransferPopupState(state, action, options);
    }
    return state;
}
