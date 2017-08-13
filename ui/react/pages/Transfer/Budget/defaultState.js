import immutable from 'immutable';
import { documentTypes } from './staticData';

export const confirmTransferPopupDefaultState = {
    data: {
        password: '',
        otp: ''
    },
    errors: {}
};

export const defaultTransferState = {
    data: {},
    errors: {},
    dropdownData: {
        account: [],
        documentType: documentTypes
    },
    screenConfiguration: {},
    confirmTransferPopup: confirmTransferPopupDefaultState
};

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: defaultTransferState
    },
    remote: {
        accounts: [],
        customerData: {
            firstName: null,
            lastName: null
        }
    }
};

export default immutable.fromJS(defaultState);
