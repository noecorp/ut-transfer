import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
const FINISHED = 'finished';
// const REQUESTED = 'requested';

let defaultState = fromJS({
    payments: [],
    filterChanged: false,
    batchChanged: false,
    customFilterSelected: null,
    showFilter: true,
    filters: {},
    paymentDetails: {},
    paymentBatch: {},
    selectedPayment: null,
    paymentStatuses: [],
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

export const bulkPayment = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAYMENTS:
            if (action.methodRequestState === FINISHED) {
                return state.set('filterChanged', false)
                    .set('pagination', fromJS(action.result.pagination && action.result.pagination.length ? action.result.pagination[0] : defaultState.get('pagination').toJS()))
                    .set('payments', fromJS(action.result.payments));
            }
            return state;
        case actionTypes.GET_PAYMENT:
            if (action.methodRequestState === FINISHED) {
                return state.set('paymentDetails', fromJS((action.result.payment || [])[0]));
            }
            return state;
        case actionTypes.GET_PAYMENT_BATCH:
            if (action.methodRequestState === FINISHED) {
                return state.set('batchChanged', false).set('paymentBatch', fromJS((action.result.batch || [])[0]));
            }
            return state;
        case actionTypes.CHANGE_PAYMENT_STATUS:
        case actionTypes.SAVE_PAYMENT:
            if (action.methodRequestState === FINISHED) {
                return state.set('filterChanged', true);
            }
            return state;
        case actionTypes.FETCH_PAYMENT_STATUSES:
            if (action.methodRequestState === FINISHED) {
                return state.set('paymentStatuses', fromJS(action.result.paymentStatuses));
            }
            return state;
        case actionTypes.CHANGE_PAYMENT_BATCH_STATUS:
            if (action.methodRequestState === FINISHED) {
                return state.set('batchChanged', true);
            }
            return state;
        case actionTypes.SELECT_PAYMENT_CUSTOM_FILTER:
            return state.set('customFilterSelected', action.params.selected);
        case actionTypes.UPDATE_PAYMENT_GRID_PAGINATION:
            return state.set('filterChanged', true)
            .set('pagination', action.params);
        case actionTypes.CHANGE_PAYMENT_GRID_SORTORDER:
            return state.set('filterChanged', true)
                .setIn(['filters', 'sortBy'], action.params.column)
                .setIn(['filters', 'sortOrder'], action.params.direction);
        case actionTypes.CHANGE_PAYMENT_FILTER:
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
        case actionTypes.CLEAR_PAYMENT_FILTER:
            return state.set('filters', fromJS({})).set('filterChanged', true);
        case actionTypes.SELECT_PAYMENT:
            return state.set('showFilter', false)
                .set('selectedPayment', action.params.isSelected ? fromJS(action.params.payment) : null);
        case actionTypes.SET_PAYMENT_FIELD:
            return state.setIn(action.params.key.split(','), action.params.value);
        case actionTypes.TOGGLE_PAYMENT_FILTER:
            return state.set('showFilter', !state.get('showFilter'));
        // confirmDialog actions
        case actionTypes.CHANGE_PAYMENT_CONFIRM_DIALOG_VALUE:
            return state
                .setIn(['confirmDialog', 'value'], action.params.value.value)
                .setIn(['confirmDialog', 'canSubmit'], action.params.value.canSubmit);
        case actionTypes.OPEN_PAYMENT_CONFIRM_DIALOG:
            return state.set('confirmDialog', fromJS(action.params.config));
        case actionTypes.CLOSE_PAYMENT_CONFIRM_DIALOG:
            return state.set('confirmDialog', fromJS(defaultState.get('confirmDialog').toJS()));
        default:
            return state;
    }
};
