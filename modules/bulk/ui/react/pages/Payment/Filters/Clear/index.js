import {connect} from 'react-redux';
import {ClearFilter} from 'ut-front-react/components/ClearFilter';

export default connect(
    (state) => {
        let isShowClear = !!(state.bulkPayment.getIn(['filters', 'customerName']) ||
        state.bulkPayment.getIn(['filters', 'sequenceNumber']) || state.bulkPayment.getIn(['filters', 'account']) ||
        state.bulkPayment.getIn(['filters', 'paymentStatusId']));
        return {
            show: isShowClear
        };
    },
)(ClearFilter);
