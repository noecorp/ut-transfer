import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    batch: {},
    file: null,
    checkBatch: true,
    errors: {},
    result: {}
});
export const bulkBatchUpload = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BATCH_INPUT:
            if (action.params.error) {
                return state.setIn(['errors'].concat(action.params.key.split(',')), action.params.errorMessage)
                .setIn(action.params.key.split(','), action.params.value);
            } else {
                return state.setIn(action.params.key.split(','), action.params.value)
                .deleteIn(['errors'].concat(action.params.key.split(',')));
            }
        case actionTypes.CLEAR_BATCH_PROFILE:
            return defaultState;
        default:
            return state;
    }
};
