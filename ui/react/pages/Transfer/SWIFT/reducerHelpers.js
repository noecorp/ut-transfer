import immutable from 'immutable';
import { formatRuleItems, transformValue } from './helpers';
import { methodRequestState } from 'ut-front-react/constants';
import { defaultState } from './defaultState';
import { transformFields } from '../../../containers/Transfer/SWIFT/config';

const editPropertyMapping = {
    'create': 'data',
    'edit': 'edited'
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
    if (transformFields.indexOf(action.key.toString()) >= 0) {
        action.value = transformValue(action.value);
    }
    return state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], ...action.key], action.value);
};

export const fetchNomenclatures = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.setIn([activeTabMode, activeTabId, 'nomenclatures'], immutable.fromJS(formatRuleItems(action.result.items)));
    }
    return state;
};

export const resetState = (state, action, options) => {
    return immutable.fromJS(defaultState);
};
