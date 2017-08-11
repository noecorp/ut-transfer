import immutable from 'immutable';
import { documentTypes } from './staticData';

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: {
            data: {},
            dropdownData: {
                account: [],
                documentType: documentTypes
            },
            screenConfiguration: {}
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
