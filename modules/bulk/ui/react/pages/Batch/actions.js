import * as actionTypes from './actionTypes';
import {reduceObject} from '../helpers';
const batchEditable = ['account', 'name', 'description', 'batchId'];

export const fetchBatches = (params) => ({
    type: actionTypes.FETCH_BATCHES,
    method: 'bulk.batch.fetch',
    params: params || {}
});

export const fetchBatchStatuses = () => ({
    type: actionTypes.FETCH_BATCH_STATUSES,
    method: 'bulk.batch.statusFetch',
    params: {}
});

export const fetchBatchTypes = () => ({
    type: actionTypes.FETCH_BATCH_TYPES,
    method: 'bulk.batch.typeFetch',
    params: {}
});

export const getBatch = (batchId) => ({
    type: actionTypes.GET_BATCH,
    method: 'bulk.batch.get',
    params: {
        batchId
    }
});

export const changeFilter = ({key, value, requireFetch}) => ({
    type: actionTypes.CHANGE_BATCH_FILTER,
    params: {
        key,
        value,
        requireFetch
    }
});

export const toggleFilter = () => ({
    type: actionTypes.TOGGLE_BATCH_FILTER
});

export const clearBatchProfile = () => ({
    type: actionTypes.CLEAR_BATCH_PROFILE
});

export const saveBatch = (batch) => ({
    type: actionTypes.SAVE_BATCH,
    method: 'bulk.batch.edit',
    params: {
        batch: reduceObject(batchEditable, batch)
    }
});

export const addBatch = (batch) => ({
    type: actionTypes.ADD_BATCH,
    method: 'bulk.batch.create',
    params: {
        batch
    }
});

export const changeBatchStatus = ({batchId, actionName, reason}) => ({
    type: actionTypes.CHANGE_BATCH_STATUS,
    method: 'bulk.batch.statusUpdate',
    params: {
        batchId,
        actionName,
        reason
    }
});

export const refetchBatches = () => ({
    type: actionTypes.REFETCH_BATCHES
});

export const setField = (params) => ({
    type: actionTypes.SET_BATCH_FIELD,
    params
});

export const selectBatch = (batch, isSelected) => ({
    type: actionTypes.SELECT_BATCH,
    params: {
        batch,
        isSelected
    }
});

export function clearFilters() {
    return {
        type: actionTypes.CLEAR_BATCH_FILTER
    };
}

export function updateGridPagination(params) {
    return {
        type: actionTypes.UPDATE_BATCH_GRID_PAGINATION,
        params: params
    };
}

export function changeSortFilter(column, direction) {
    return {
        type: actionTypes.CHANGE_BATCH_GRID_SORTORDER,
        params: {column, direction}
    };
}

export function openConfirmDialog(config) {
    return {
        type: actionTypes.OPEN_BATCH_CONFIRM_DIALOG,
        params: {config}
    };
}

export function changeConfirmDialogValue(value) {
    return {
        type: actionTypes.CHANGE_BATCH_CONFIRM_DIALOG_VALUE,
        params: {value}
    };
}

export function closeConfirmDialog() {
    return {
        type: actionTypes.CLOSE_BATCH_CONFIRM_DIALOG
    };
}

export function updateErrors(errors) {
    return {
        type: actionTypes.UPDATE_BATCH_ERRORS,
        errors
    };
}

export function selectCustomFilter(selected) {
    return {
        type: actionTypes.SELECT_BATCH_CUSTOM_FILTER,
        params: {
            selected
        }
    };
}
