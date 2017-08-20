import immutable from 'immutable';

export const defaultState = {
    activeTabData: {
        transferType: '',
        id: ''
    },
    budget: {},
    swift: {}
};

export default immutable.fromJS(defaultState);
