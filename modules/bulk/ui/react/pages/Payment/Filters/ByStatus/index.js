import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import { changeFilter, fetchPaymentStatuses } from '../../actions';

export class ByStatus extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        if (this.props.paymentStatuses.length < 1) {
            this.props.fetchPaymentStatuses();
        }
    }
    handleSelect(record) {
        if (record.value === '__placeholder__') {
            record.value = null;
        }
        this.props.changeFilter({'key': record.key, value: record.value});
    }
    render() {
        return (
            <Dropdown
              placeholder='Payment Status'
              keyProp='paymentStatusId'
              canSelectPlaceholder
              onSelect={this.handleSelect}
              data={this.props.paymentStatuses}
              defaultSelected={this.props.value}
            />
        );
    }
}

ByStatus.propTypes = {
    paymentStatuses: PropTypes.array.isRequired,
    changeFilter: PropTypes.func.isRequired,
    fetchPaymentStatuses: PropTypes.func.isRequired,
    value: PropTypes.any
};

export default connect(
    (state) => {
        return {
            paymentStatuses: state.bulkPayment.get('paymentStatuses').toJS(),
            value: state.bulkPayment.getIn(['filters', 'paymentStatusId'])
        };
    },
    {changeFilter, fetchPaymentStatuses}
)(ByStatus);
