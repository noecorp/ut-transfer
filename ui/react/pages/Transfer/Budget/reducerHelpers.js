import immutable from 'immutable';

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

export const editTransferField = (state, action, options) => {
    const { field, value } = action.params;
    const { activeTabMode, activeTabId } = options;
    let newState = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], field], value);
    if (field === 'account') {
        let customerData = state.getIn([activeTabMode, activeTabId, 'remote', 'customerData']);
        newState = newState
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceName'], customerData.get('name'))
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'civilIdentifier'], customerData.getIn(['civilIdentifier', 'value']));
    }
    return newState;
};
