import immutable from 'immutable';
import { documentTypes } from './staticData';

export const confirmTransferPopupDefaultState = {
    data: {
        password: '',
        otp: ''
    },
    errors: {}
};

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: {
            data: {},
            errors: {},
            dropdownData: {
                account: [],
                documentType: documentTypes
            },
            screenConfiguration: {},
            confirmTransferPopup: confirmTransferPopupDefaultState
        }
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
