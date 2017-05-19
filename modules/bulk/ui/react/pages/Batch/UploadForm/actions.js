import * as actionTypes from './actionTypes';
import { refetchBatches } from '../actions';

export const methodRequestState = {
    FINISHED: 'finished',
    REQUESTED: 'requested'
};

export const showPreload = (index) => ({
    type: actionTypes.TOGGLE_PRELOAD,
    methodRequestState: methodRequestState.REQUESTED,
    prefetchWindowText: 'Uploading file to server...'
});

export const hidePreload = (index) => ({
    type: actionTypes.TOGGLE_PRELOAD,
    methodRequestState: methodRequestState.FINISHED
});

export const changeField = (params) => ({
    type: actionTypes.CHANGE_BATCH_INPUT,
    params
});

export const clearBatchProfile = () => ({
    type: actionTypes.CLEAR_BATCH_PROFILE
});

export const fetchBatches = refetchBatches;
