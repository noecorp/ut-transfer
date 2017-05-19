import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    file: null,
    name: null,
    checkBatch: true,
    errors: {},
    result: {}
});
export const bulkBatchUpload = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BATCH_INPUT:
            if (action.params.error) {
                return state.setIn(['errors', action.params.key], action.params.errorMessage)
                .set(action.params.key, action.params.value);
            } else {
                return state.set(action.params.key, action.params.value)
                .deleteIn(['errors', action.params.key]);
            }
        case actionTypes.CLEAR_BATCH_PROFILE:
            return defaultState;
        default:
            return state;
    }
};
