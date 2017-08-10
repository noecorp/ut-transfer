import immutable from 'immutable';
import { documentTypes } from './staticData';
console.log(documentTypes);

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: {
            data: {},
            dropdownData: {
                accounts: [],
                documentTypes: documentTypes
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
