import immutable from 'immutable';

export const defaultState = {
    create: {
        create: {
            data: {},
            dropdownData: {
                accounts: []
            },
            remote: {
                accounts: []
            },
            screenConfiguration: {}
        }
    }
};

export default immutable.fromJS(defaultState);
