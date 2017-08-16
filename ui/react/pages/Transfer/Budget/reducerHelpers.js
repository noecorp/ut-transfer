import immutable from 'immutable';
import { bics, paymentTypes } from './staticData';
import { defaultTransferState } from './defaultState';
import { methodRequestState } from 'ut-front-react/constants';
import { uppercasedInputs } from '../../../containers/Transfer/Budget/config';

const editPropertyMapping = {
    'create': 'data',
    'edit': 'edited'
};

// PRIVATE HELPERS

const getPaymentTypesDropdownData = (iban) => {
    let paymentTypeIdentifier = iban.substr(12, 2);
    let correspondingPaymentType = paymentTypes[paymentTypeIdentifier];
    var paymentTypesDropdownData = [];
    Object.keys(correspondingPaymentType.codes).forEach(key => {
        let name = `${key} - ${correspondingPaymentType.codes[key]}`;
        paymentTypesDropdownData.push({ key, name });
    });
    return paymentTypesDropdownData;
};

// EXPORTED REDUCERS

export const getScreenConfiguration = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED && !action.error) {
        return state.setIn([activeTabMode, activeTabId, 'screenConfiguration'], immutable.fromJS(action.result));
    }
    return state;
};

export const fetchCustomerData = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED && !action.error) {
        return state
            .setIn([activeTabMode, activeTabId, 'remote', 'customerData'], immutable.fromJS(action.result.customerData))
            .setIn([activeTabMode, activeTabId, 'remote', 'customerData', 'name'], `${action.result.customerData.firstName} ${action.result.customerData.lastName}`);
    }
    return state;
};

export const editTransferField = (state, action, options) => {
    const { field, data } = action.params;
    var { value } = action.params;
    const { activeTabMode, activeTabId } = options;
    if (uppercasedInputs.indexOf(field) >= 0 || uppercasedInputs.indexOf(field.toString()) >= 0) {
        value = value.toUpperCase();
    }
    if (Array.isArray(field)) {
        state = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], ...field], value);
    } else {
        state = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], field], value);
    }
    if (data && data.error && data.errorMessage) {
        state = state.setIn([activeTabMode, activeTabId, 'errors', field], data.errorMessage);
    } else {
        state = state.deleteIn([activeTabMode, activeTabId, 'errors', field]);
    }
    if (field === 'account') {
        let selectedAccount = state
            .getIn([activeTabMode, activeTabId, 'remote', 'accounts'])
            .filter(acc => acc.get('accountNumber') === action.params.value).first().toJS();
        let { customerData } = selectedAccount;
        let name = `${customerData.firstName} ${customerData.lastName}`;
        let sourceIban = selectedAccount.iban;
        let sourceBank = selectedAccount.bank;
        let sourceBankLatin = selectedAccount.bankLatin;
        let { civilIdentifier } = customerData;
        var sourcePersonIdentifier;
        if (civilIdentifier.type === 'resident') {
            sourcePersonIdentifier = 'civilIdentifier';
        } else {
            sourcePersonIdentifier = 'foreignResidentIdentifier';
        }
        state = state
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceIban'], sourceIban.toUpperCase())
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceBank'], sourceBank.toUpperCase())
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceBankLatin'], sourceBankLatin.toUpperCase())
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'sourceName'], name.toUpperCase())
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'phone'], selectedAccount.phone)
            .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], sourcePersonIdentifier], civilIdentifier.value);
    }
    if (field === 'transferExecution') {
        if (value === 'now') {
            state = state.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'transferExecutionDate'], new Date().toLocaleDateString());
        } else {
            state = state.deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'transferExecutionDate']);
        }
    }
    if (field === 'iban' && value.length === 22) {
        let bicIdentifier = value.substr(4, 4).toUpperCase();
        let correspondingBic = bics.find(bic => bic.identifier === bicIdentifier);
        if (correspondingBic) {
            state = state
                .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'bic'], correspondingBic.bic)
                .setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'bank'], correspondingBic.bank.toUpperCase());
        }
        let paymentTypesDropdownData = getPaymentTypesDropdownData(value);
        state = state.setIn([activeTabMode, activeTabId, 'dropdownData', 'paymentType'], immutable.fromJS(paymentTypesDropdownData));
    }
    if (field === 'liableEntityType') {
        if (value === 'person') {
            state = state
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'bulstat'])
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'foreignResidentIdentifier']);
        }
        if (value === 'legalEntity') {
            state = state
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'personalIdentifier'])
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'foreignResidentIdentifier']);
        }
        if (value === 'foreignResident') {
            state = state
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'bulstat'])
                .deleteIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], 'liableEntityInfo', 'foreignResidentIdentifier']);
        }
    }
    return state;
};

export const resetTransferState = (state, aciton, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.setIn([activeTabMode, activeTabId], immutable.fromJS(defaultTransferState));
};

export const fetchTemplates = (state, action, options) => {
    if (action.methodRequestState === methodRequestState.FINISHED && !action.error) {
        return state.set('templates', immutable.fromJS(action.result.templates));
    }
    return state;
};

export const createTemplate = (state, action, options) => {
    return state;
};

export const applyTemplate = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    let templateIndex = action.params.templateIndex;
    if (typeof templateIndex !== 'number') {
        return state;
    }
    let template = state.getIn(['templates', templateIndex, 'data']);
    let templateData = template.get('data');
    if (templateData.has('iban') && templateData.get('iban').length === 22) {
        let paymentTypesDropdownData = getPaymentTypesDropdownData(templateData.get('iban'));
        state = state.deleteIn([activeTabMode, activeTabId, 'dropdownData', 'paymentType'], immutable.List()); // Reset the dropdown
        template = template.setIn(['dropdownData', 'paymentType'], immutable.List(paymentTypesDropdownData));
    }
    state = state.mergeDeepIn([activeTabMode, activeTabId], template);
    return state;
};
