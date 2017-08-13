import immutable from 'immutable';
import { formatRuleItems } from './helpers';
import { methodRequestState } from 'ut-front-react/constants';

const editPropertyMapping = {
    'create': 'data',
    'edit': 'edited'
};

export const setActiveTab = (state, action, options) => {
    return state.set('activeTabData', immutable.Map({
        mode: action.params.mode,
        id: action.params.id
    }));
};

export const editTransferField = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    let newState = state;
    if (action.data && action.data.errorMessage) {
        newState = newState.setIn([activeTabMode, activeTabId, 'errors', ...action.key], action.data.errorMessage);
    } else {
        newState = newState.deleteIn([activeTabMode, activeTabId, 'errors', ...action.key]);
    }
    return newState.setIn([activeTabMode, activeTabId, editPropertyMapping[activeTabMode], ...action.key], action.value);
};

export const setErrors = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    return state.mergeDeepIn([activeTabMode, activeTabId, 'errors'], action.params);
};

export const fetchNomenclatures = (state, action, options) => {
    const { activeTabMode, activeTabId } = options;
    if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.setIn([activeTabMode, activeTabId, 'nomenclatures'], immutable.fromJS(formatRuleItems(action.result.items)));
    }
    return state;
};
