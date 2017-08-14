import immutable from 'immutable';
import { defaultState } from './defaultState';
import * as actionTypes from './actionTypes';

let defaultStateImmutable = immutable.fromJS(defaultState);

export default function transferSwift(state = defaultStateImmutable, action) {
    switch (action.type) {
        case actionTypes.EDIT_CONFIRM_TRANSFER_POPUP_FIELD:
            const { field, value, data } = action.params;
            state = state.setIn(['data', field], value);
            if (data && data.error && data.errorMessage) {
                state = state.setIn(['errors', field], data.errorMessage);
            } else {
                state = state.deleteIn(['errors', field]);
            }
            return state;
        case actionTypes.SET_CONRIFM_TRANSFER_POPUP_ERRORS:
            return state.mergeDeep('errors', action.params.errors);
        case actionTypes.RESET_CONFIRM_TRANSFER_POPUP_STATE:
            return defaultStateImmutable;
        default:
            return state;
    }
};
