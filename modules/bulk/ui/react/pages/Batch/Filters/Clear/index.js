import {connect} from 'react-redux';
import {ClearFilter} from 'ut-front-react/components/ClearFilter';

export default connect(
    (state) => {
        let isShowClear = !!(state.bulkBatch.getIn(['filters', 'batchId']) ||
        state.bulkBatch.getIn(['filters', 'batchName']) || state.bulkBatch.getIn(['filters', 'account']) ||
        state.bulkBatch.getIn(['filters', 'fromDate']) || state.bulkBatch.getIn(['filters', 'toDate']) ||
        state.bulkBatch.getIn(['filters', 'transactionType']) || state.bulkBatch.getIn(['filters', 'currency']));
        return {
            show: isShowClear
        };
    },
)(ClearFilter);
