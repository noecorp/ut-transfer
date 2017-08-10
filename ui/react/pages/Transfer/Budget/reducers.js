import * as actionTypes from './actionTypes';
import * as transferBudgetReducers from './reducerHelpers';
import defaultState from './defaultState';

export default function transfers(state = defaultState, action) {
    const options = {
        activeTabMode: 'create',
        activeTabId: 'create'
    };
    switch (action.type) {
        case actionTypes.GET_SCREEN_CONFIGURATION:
            return transferBudgetReducers.getScreenConfiguration(state, action, options);
        case actionTypes.FETCH_ACCOUNTS:
            return transferBudgetReducers.fetchAccounts(state, action, options);
    }
    return state;
};
