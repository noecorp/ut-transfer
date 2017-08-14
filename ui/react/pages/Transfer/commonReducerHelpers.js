import immutable from 'immutable';
import { methodRequestState } from 'ut-front-react/constants';

import { confirmTransferPopupDefaultState } from '../../containers/Transfer/ConfirmTransferPopup/defaultState';


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

export const fetchAccounts = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED && !action.error) {
        let { accounts } = action.result;
        let accountsForDropdown = accounts.map(account => ({
            key: account.accountNumber,
            name: `${account.bank}: ${account.accountNumber} - ${account.name} (${account.balance} ${account.currency})`
        }));
        return state
            .setIn([activeTabMode, activeTabId, 'remote', 'accounts'], immutable.fromJS(accounts))
            .setIn([activeTabMode, activeTabId, 'dropdownData', 'account'], immutable.fromJS(accountsForDropdown));
    }
    return state;
};


