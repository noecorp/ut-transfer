import immutable from 'immutable';

import * as actionTypes from './actionTypes';
import * as transferBudgetReducers from './reducerHelpers';
import * as commonTransferReducers from '../commonReducerHelpers';
import defaultState from './defaultState';

const defaultStateImmutable = immutable.fromJS(defaultState);

export default function transfersBudget(state = defaultStateImmutable, action) {
    const activeTabMode = state.getIn(['activeTabData', 'mode']);
    const activeTabId = state.getIn(['activeTabData', 'id']);
    const options = { activeTabMode, activeTabId };
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return commonTransferReducers.setActiveTab(state, action, options);
        case actionTypes.SET_ERRORS:
            return commonTransferReducers.setErrors(state, action, options);
        case actionTypes.GET_SCREEN_CONFIGURATION:
            return transferBudgetReducers.getScreenConfiguration(state, action, options);
        case actionTypes.FETCH_ACCOUNTS:
            return commonTransferReducers.fetchAccounts(state, action, options);
        // case actionTypes.FETCH_CUSTOMER_DATA:
        //     return transferBudgetReducers.fetchCustomerData(state, action, options);
        case actionTypes.EDIT_TRANSFER_FIELD:
            return transferBudgetReducers.editTransferField(state, action, options);
        case actionTypes.RESET_TRANSFER_STATE:
            return transferBudgetReducers.resetTransferState(state, action, options);
        case actionTypes.FETCH_TEMPLATES:
            return transferBudgetReducers.fetchTemplates(state, action, options);
        case actionTypes.CREATE_TEMPLATE:
            return transferBudgetReducers.createTemplate(state, action, options);
        case actionTypes.APPLY_TEMPLATE:
            return transferBudgetReducers.applyTemplate(state, action, options);
        case actionTypes.GET_TRANSFER:
            return transferBudgetReducers.getTransfer(state, action, options);
    }
    return state;
};
