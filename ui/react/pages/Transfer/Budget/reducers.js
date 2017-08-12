import immutable from 'immutable';

import * as actionTypes from './actionTypes';
import * as transferBudgetReducers from './reducerHelpers';
import defaultState from './defaultState';

const defaultStateImmutable = immutable.fromJS(defaultState);

export default function transfersBudget(state = defaultStateImmutable, action) {
    const activeTabMode = state.getIn(['activeTabData', 'mode']);
    const activeTabId = state.getIn(['activeTabData', 'id']);
    const options = { activeTabMode, activeTabId };
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return transferBudgetReducers.setActiveTab(state, action, options);
        case actionTypes.SET_ERRORS:
            return transferBudgetReducers.setErrors(state, action, options);
        case actionTypes.GET_SCREEN_CONFIGURATION:
            return transferBudgetReducers.getScreenConfiguration(state, action, options);
        case actionTypes.FETCH_ACCOUNTS:
            return transferBudgetReducers.fetchAccounts(state, action, options);
        case actionTypes.FETCH_CUSTOMER_DATA:
            return transferBudgetReducers.fetchCustomerData(state, action, options);
        case actionTypes.EDIT_TRANSFER_FIELD:
            return transferBudgetReducers.editTransferField(state, action, options);
    }
    return state;
};
