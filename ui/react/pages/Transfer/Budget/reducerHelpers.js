import immutable from 'immutable';
import { bics, paymentTypes } from './staticData';
import { confirmTransferPopupDefaultState } from './defaultState';

const REQUESTED = 'requested';
const FINISHED = 'finished';

const editPropertyMapping = {
    'create': 'data',
    'edit': 'edited'
};

export const setActiveTab = (state, action, options) => {
    return state.set('activeTabData', immutable.Map({
        mode: action.params.mode,
        id: action.params.id
    }));
};

export const setErrors = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.mergeDeepIn([activeTabMode, activeTabId, 'errors'], action.params.errors);
};

export const setConfirmTransferPopupErrors = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.mergeDeepIn([activeTabMode, activeTabId, 'confirmTransferPopup', 'errors'], action.params.errors);
};

export const getScreenConfiguration = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === FINISHED && !action.error) {
        return state.setIn([activeTabMode, activeTabId, 'screenConfiguration'], immutable.fromJS(action.result));
    }
    return state;
};

export const fetchCustomerData = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === FINISHED && !action.error) {
        return state
            .setIn([activeTabMode, activeTabId, 'remote', 'customerData'], immutable.fromJS(action.result.customerData))
            .setIn([activeTabMode, activeTabId, 'remote', 'customerData', 'name'], `${action.result.customerData.firstName} ${action.result.customerData.lastName}`);
    }
    return state;
};

export const fetchAccounts = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === FINISHED && !action.error) {
        let { accounts } = action.result;
        let accountsForDropdown = accounts.map(account => ({
            key: account.accountNumber,
            name: `${account.accountNumber} ${account.name} (${account.balance} ${account.currency})`
        }));
        return state
            .setIn([activeTabMode, activeTabId, 'remote', 'accounts'], immutable.fromJS(accounts))
            .setIn([activeTabMode, activeTabId, 'dropdownData', 'account'], immutable.fromJS(accountsForDropdown));
    }
    return state;
};

export const editConfirmTransferPopupField = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    const { field, value } = action.params;
    return state
        .setIn([activeTabMode, activeTabId, 'confirmTransferPopup', 'data', field], value);
};

export const resetConfirmTransferPopupState = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.setIn([activeTabMode, activeTabId, 'confirmTransferPopup'], immutable.fromJS(confirmTransferPopupDefaultState));
};

export const editTransferField = (state, action, options) => {
    const { field, value, errorMessage } = action.params;
    const { activeTabMode, activeTabId } = options;
    state = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], field], value);
    if (errorMessage) {
        state = state.setIn([activeTabMode, activeTabId, 'errors', field], errorMessage);
    } else {
        state = state.deleteIn([activeTabMode, activeTabId, 'errors', field]);
    }
    if (field === 'account') {
        let customerData = state.getIn([activeTabMode, activeTabId, 'remote', 'customerData']);
        state = state
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceName'], customerData.get('name'))
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'civilIdentifier'], customerData.getIn(['civilIdentifier', 'value']));
    }
    if (field === 'iban' && value.length === 22) {
        let bicIdentifier = value.substr(4, 4).toUpperCase();
        let correspondingBic = bics.find(bic => bic.identifier === bicIdentifier);
        if (correspondingBic) {
            state = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'bic'], correspondingBic.bic);
        }
        let paymentTypeIdentifier = value.substr(12, 2);
        let correspondingPaymentType = paymentTypes[paymentTypeIdentifier];
        var paymentTypesDropdownData = [];
        Object.keys(correspondingPaymentType.codes).forEach(key => {
            let name = `${key} - ${correspondingPaymentType.codes[key]}`;
            paymentTypesDropdownData.push({ key, name });
        });
        state = state.setIn([activeTabMode, activeTabId, 'dropdownData', 'paymentType'], immutable.fromJS(paymentTypesDropdownData));
    }
    return state;
};
