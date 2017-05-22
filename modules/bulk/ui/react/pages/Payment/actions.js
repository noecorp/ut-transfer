import * as actionTypes from './actionTypes';
import { updateTabTitle } from 'ut-front-react/containers/TabMenu/actions';
import { reduceObject } from '../helpers';

const paymentEditable = ['customerName', 'paymentId', 'description', 'account', 'amount'];

export const fetchPayments = (params) => ({
    type: actionTypes.FETCH_PAYMENTS,
    method: 'bulk.payment.fetch',
    params: params || {}
});

export const fetchPaymentStatuses = () => ({
    type: actionTypes.FETCH_PAYMENT_STATUSES,
    method: 'bulk.payment.statusFetch',
    params: {}
});

export const getPayment = (paymentId) => ({
    type: actionTypes.GET_PAYMENT,
    method: 'bulk.payment.get',
    params: {
        paymentId
    }
});

export const getPaymentBatch = (batchId) => ({
    type: actionTypes.GET_PAYMENT_BATCH,
    method: 'bulk.batch.get',
    params: {
        batchId
    }
});

export const changeFilter = ({key, value, requireFetch}) => ({
    type: actionTypes.CHANGE_PAYMENT_FILTER,
    params: {
        key,
        value,
        requireFetch
    }
});

export const toggleFilter = () => ({
    type: actionTypes.TOGGLE_PAYMENT_FILTER
});

export const clearPaymentProfile = () => ({
    type: actionTypes.CLEAR_PAYMENT_PROFILE
});

export const savePayment = (payment) => ({
    type: actionTypes.SAVE_PAYMENT,
    method: 'bulk.payment.edit',
    params: {
        payment: reduceObject(paymentEditable, payment)
    }
});

export const changePaymentStatus = ({paymentId, statusCode}) => ({
    type: actionTypes.CHANGE_PAYMENT_STATUS,
    method: 'bulk.payment.statusUpdate',
    params: {
        paymentId,
        statusCode
    }
});

export const changeBatchStatus = ({batchId, actionName, reason}) => ({
    type: actionTypes.CHANGE_PAYMENT_BATCH_STATUS,
    method: 'bulk.batch.statusUpdate',
    params: {
        batchId,
        actionName,
        reason
    }
});

export const setField = (params) => ({
    type: actionTypes.SET_PAYMENT_FIELD,
    params
});

export const selectPayment = (payment, isSelected) => ({
    type: actionTypes.SELECT_PAYMENT,
    params: {
        payment,
        isSelected
    }
});

export function clearFilters() {
    return {
        type: actionTypes.CLEAR_PAYMENT_FILTER
    };
}

export function updateGridPagination(params) {
    return {
        type: actionTypes.UPDATE_PAYMENT_GRID_PAGINATION,
        params: params
    };
}

export function changeSortFilter(column, direction) {
    return {
        type: actionTypes.CHANGE_PAYMENT_GRID_SORTORDER,
        params: {column, direction}
    };
}

export function openConfirmDialog(config) {
    return {
        type: actionTypes.OPEN_PAYMENT_CONFIRM_DIALOG,
        params: {config}
    };
}

export function changeConfirmDialogValue(value) {
    return {
        type: actionTypes.CHANGE_PAYMENT_CONFIRM_DIALOG_VALUE,
        params: {value}
    };
}

export function closeConfirmDialog() {
    return {
        type: actionTypes.CLOSE_PAYMENT_CONFIRM_DIALOG
    };
}

export function updateErrors(errors) {
    return {
        type: actionTypes.UPDATE_PAYMENT_ERRORS,
        errors
    };
}

export function selectCustomFilter(selected) {
    return {
        type: actionTypes.SELECT_PAYMENT_CUSTOM_FILTER,
        params: {
            selected
        }
    };
}

export const changeTabTitle = updateTabTitle;
