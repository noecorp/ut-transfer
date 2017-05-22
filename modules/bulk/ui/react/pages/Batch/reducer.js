import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
const FINISHED = 'finished';
// const REQUESTED = 'requested';

let uploadForm = {
    batchId: null,
    comment: null,
    description: null,
    file: null,
    fileName: null,
    account: {},
    errors: fromJS({}),
    canSubmit: false
};

let defaultState = fromJS({
    uploadForm,
    customFilterSelected: null,
    batches: [],
    filterChanged: false,
    showFilter: true,
    filters: {},
    batchDetails: {},
    selectedBatch: null,
    batchStatuses: [],
    batchTypes: [],
    pagination: {
        pageSize: 25,
        pageNumber: 1,
        recordsTotal: 0,
        pagesTotal: 0
    },
    confirmDialog: {
        isOpen: false,
        title: '',
        value: '',
        message: '',
        showInput: false,
        buttons: [],
        canSubmit: false
    },
    errors: {}
});

export const bulkBatch = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BATCHES:
            if (action.methodRequestState === FINISHED) {
                return state.set('filterChanged', false)
                    .set('pagination', fromJS(action.result.pagination.length ? action.result.pagination[0] : defaultState.get('pagination').toJS()))
                    .set('batches', fromJS(action.result.batches));
            }
            return state;
        case actionTypes.GET_BATCH:
            if (action.methodRequestState === FINISHED) {
                return state.set('batchDetails', fromJS((action.result.batch || [])[0]));
            }
            return state;
        case actionTypes.REFETCH_BATCHES:
            return state.set('filterChanged', true);
        case actionTypes.CHANGE_BATCH_STATUS:
        case actionTypes.SAVE_BATCH:
            if (action.methodRequestState === FINISHED) {
                return state.set('filterChanged', true);
            }
            return state;
        case actionTypes.FETCH_BATCH_STATUSES:
            if (action.methodRequestState === FINISHED) {
                return state.set('batchStatuses', fromJS(action.result.batchStatuses));
            }
            return state;
        case actionTypes.FETCH_BATCH_TYPES:
            if (action.methodRequestState === FINISHED) {
                return state.set('batchTypes', fromJS(action.result.batchTypes));
            }
            return state;
        case actionTypes.SELECT_BATCH_CUSTOM_FILTER:
            return state.set('customFilterSelected', action.params.selected);
        case actionTypes.UPDATE_BATCH_GRID_PAGINATION:
            return state.set('filterChanged', true)
            .set('pagination', action.params);
        case actionTypes.CHANGE_BATCH_GRID_SORTORDER:
            return state.set('filterChanged', true)
                .setIn(['filters', 'sortBy'], action.params.column)
                .setIn(['filters', 'sortOrder'], action.params.direction);
        case actionTypes.CHANGE_BATCH_FILTER:
            if (!action.params.value) {
                state = state.deleteIn(['filters', action.params.key]);
            } else {
                state = state.setIn(['filters', action.params.key], action.params.value);
            }
            if (action.params.requireFetch !== undefined) {
                state = state.set('filterChanged', action.params.requireFetch);
            } else {
                state = state.set('filterChanged', true);
            }
            state = state.set('pagination', defaultState.get('pagination'));
            return state;
        case actionTypes.CLEAR_BATCH_FILTER:
            return state.set('customFilterSelected', null)
            .set('filters', fromJS({})).set('filterChanged', true);
        case actionTypes.SELECT_BATCH:
            return state.set('showFilter', false)
                .set('selectedBatch', action.params.isSelected ? fromJS(action.params.batch) : null);
        case actionTypes.SET_BATCH_FIELD:
            if (action.params.error) {
                return state.setIn(['errors'].concat(action.params.key.split(',')), action.params.errorMessage)
                    .setIn(action.params.key.split(','), action.params.value);
            } else {
                return state.setIn(action.params.key.split(','), action.params.value)
                    .deleteIn(['errors'].concat(action.params.key.split(',')));
            }
        case actionTypes.TOGGLE_BATCH_FILTER:
            return state.set('showFilter', !state.get('showFilter'));
        // confirmDialog actions
        case actionTypes.CHANGE_BATCH_CONFIRM_DIALOG_VALUE:
            return state
                .setIn(['confirmDialog', 'value'], action.params.value.value)
                .setIn(['confirmDialog', 'canSubmit'], action.params.value.canSubmit);
        case actionTypes.OPEN_BATCH_CONFIRM_DIALOG:
            return state.set('confirmDialog', fromJS(action.params.config));
        case actionTypes.CLOSE_BATCH_CONFIRM_DIALOG:
            return state.set('confirmDialog', fromJS(defaultState.get('confirmDialog').toJS()));
        default:
            return state;
    }
};
