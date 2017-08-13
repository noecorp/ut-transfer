
import * as actionTypes from './actionTypes';
import { defaultState } from './defaultState';

export default function transferSwift(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_FIELD:
            let newState = state;
            if (action.data && action.data.errorMessage) {
                newState = newState.setIn(['errors', ...action.key], action.data.errorMessage);
            } else {
                newState = newState.deleteIn(['errors', ...action.key]);
            }
            return newState
                .setIn([...action.key], action.value);
        case actionTypes.SET_ERRORS:
            return state.mergeDeepIn(['errors'], action.params);
    }

    return state;
}
