import immutable from 'immutable';
import { documentTypes } from './staticData';
// import { confirmTransferPopupDefaultState } from '../../../containers/Transfer/ConfirmTransferPopup/defaultState';

export const defaultTransferState = {
    data: {
        documentType: '9'
    },
    errors: {},
    dropdownData: {
        account: [],
        documentType: documentTypes
    },
    screenConfiguration: {},
    // confirmTransferPopup: confirmTransferPopupDefaultState
};

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: defaultTransferState
    },
    templates: [],
    remote: {
        accounts: []
    }
};

export default immutable.fromJS(defaultState);
