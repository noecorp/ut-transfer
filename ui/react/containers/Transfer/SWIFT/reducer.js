import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import {methodRequestState} from 'ut-front-react/constants';

import { formatRuleItems } from './helpers';

const defaultState = fromJS({
    sender: {
        sourceAccount: '',
        phone: '',
        name: '',
        ibanOrderer: '',
        address: '',
        sum: '',
        currency: '',
        city: '',
        transferDestination: '',
        country: ''
    },
    bankBeneficiary: {
        swift: '',
        city: '',
        name: '',
        country: '',
        address: ''
    },
    beneficiary: {
        recipient: '',
        country: '',
        address: '',
        accountNumber: '',
        city: ''
    },
    transfer: {
        priority: '',
        reason: '',
        otherBankCosts: '',
        comments: ''
    },
    priorityData: [],
    countries: [],
    recipients: [],
    sourceAccounts: [],
    transferDestinations: [],
    errors: {},
    nomenclatures: {
        currency: [],
        country: []
    }
});

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
        case actionTypes.FETCH_NOMENCLATURES:
            if (action.methodRequestState === methodRequestState.FINISHED) {
                return state.set('nomenclatures', fromJS(formatRuleItems(action.result.items)));
            }
            return state;
    }

    return state;
}
