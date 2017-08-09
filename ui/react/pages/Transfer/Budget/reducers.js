import * as actionTypes from './actionTypes';
import * as transferBudgetReducers from './reducerHelpers';
import defaultState from './defaultState';

export default function transfersBudget(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.GET_SCREEN_CONFIGURATION:
            return transferBudgetReducers.getScreenConfiguration(state, action);
    }
    return state;
};
