import immutable from 'immutable';

const REQUESTED = 'requested';
const FINISHED = 'finished';

export const getScreenConfiguration = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === FINISHED && !action.error) {
        return state.setIn([activeTabMode, activeTabId, 'screenConfiguration'], immutable.fromJS(action.result));
    }
    return state;
};

export const fetchAccounts = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === FINISHED && !action.error) {
        return state.setIn([activeTabMode, activeTabId, 'remote', 'accounts'], immutable.fromJS(action.result));
    }
    return state;
};
