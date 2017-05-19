import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import { changeFilter, fetchBatchStatuses } from '../../actions';

export class ByStatus extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        if (this.props.batchStatuses.length < 1) {
            this.props.fetchBatchStatuses();
        }
    }
    handleSelect(record) {
        if (record.value === '__placeholder__') {
            record.value = null;
        }
        this.props.changeFilter({'key': 'batchStatusId', value: record.value});
    }
    render() {
        return (
            <Dropdown
              placeholder='Batch Status'
              keyProp='name'
              canSelectPlaceholder
              onSelect={this.handleSelect}
              data={this.props.batchStatuses}
              defaultSelected={this.props.value}
            />
        );
    }
}

ByStatus.propTypes = {
    batchStatuses: PropTypes.array.isRequired,
    changeFilter: PropTypes.func.isRequired,
    fetchBatchStatuses: PropTypes.func.isRequired,
    value: PropTypes.any
};

export default connect(
    (state) => {
        return {
            batchStatuses: state.bulkBatch.get('batchStatuses').toJS(),
            value: state.bulkBatch.getIn(['filters', 'batchStatusId'])
        };
    },
    {changeFilter, fetchBatchStatuses}
)(ByStatus);
