import immutable from 'immutable';
import { formatRuleItems } from './helpers';
import { methodRequestState } from 'ut-front-react/constants';
import { defaultState } from './defaultState';

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

export const editTransferField = (state, action, options) => {
    const { key: field } = action.data;
    const { activeTabMode, activeTabId } = options;

    if (field === 'sourceAccount') {
        let selectedAccount = state.getIn([activeTabMode, activeTabId, 'remote', 'accounts'])
            .filter(acc => acc.get('accountNumber') === action.value).first().toJS();
        let { customerData } = selectedAccount;
        let name = `${customerData.firstName} ${customerData.lastName}`;
        let iban = selectedAccount.iban;
        let phone = selectedAccount.phone || 'todo!';
        state = state
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sender', 'name'], name)
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sender', 'iban'], iban)
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sender', 'phone'], phone);
    }
    if (field === 'transferDestination' && action.data.value !== 'abroad') {
        state = state
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'bankBeneficiary', 'country'], '353');
    }
    if (action.data && action.data.errorMessage) {
        state = state.setIn([activeTabMode, activeTabId, 'errors', ...action.key], action.data.errorMessage);
    } else {
        state = state.deleteIn([activeTabMode, activeTabId, 'errors', ...action.key]);
    }
    return state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], ...action.key], action.value);
};

export const setErrors = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.mergeDeepIn([activeTabMode, activeTabId, 'errors'], action.params);
};

export const fetchNomenclatures = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.setIn([activeTabMode, activeTabId, 'nomenclatures'], immutable.fromJS(formatRuleItems(action.result.items)));
    }
    return state;
};

export const fetchAccounts = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED && !action.error) {
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

export const resetConfirmTransferPopupState = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.setIn([activeTabMode, activeTabId, 'confirmTransferPopup'], immutable.fromJS(confirmTransferPopupDefaultState));
};

export const resetState = (state, action, options) => {
    return defaultState;
};
