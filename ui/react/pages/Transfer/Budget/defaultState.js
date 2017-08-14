import immutable from 'immutable';
import { documentTypes } from './staticData';
// import { confirmTransferPopupDefaultState } from '../../../containers/Transfer/ConfirmTransferPopup/defaultState';

export const defaultTransferState = {
    data: {},
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
