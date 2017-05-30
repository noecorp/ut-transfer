import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import { changeFilter, fetchBatchStatuses } from '../../actions';
import style from '../../../style.css';

const currency = [
            {key: 'USD', name: 'USD'},
            {key: 'EUR', name: 'EUR'},
            {key: 'GBP', name: 'GBP'}
];
const transactionType = [
            {key: 'type1', name: 'Transaction Type 1'},
            {key: 'type2', name: 'Transaction Type 2'},
            {key: 'type3', name: 'Transaction Type 3'}
];
export class ByStatus extends Component {
    constructor(props) {
        super(props);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
        this.handleTransactionSelect = this.handleTransactionSelect.bind(this);
    }
    componentWillMount() {
        if (this.props.batchStatuses.length < 1) {
            this.props.fetchBatchStatuses();
        }
    }
    handleStatusSelect(record) {
        if (record.value === '__placeholder__') {
            record.value = null;
        }
        this.props.changeFilter({'key': 'batchStatusId', value: record.value, requireFetch: false});
    }
    handleCurrencySelect(record) {
        if (record.value === '__placeholder__') {
            record.value = null;
        }
        this.props.changeFilter({'key': 'currency', value: record.value, requireFetch: false});
    }
    handleTransactionSelect(record) {
        if (record.value === '__placeholder__') {
            record.value = null;
        }
        this.props.changeFilter({'key': 'transactionType', value: record.value, requireFetch: false});
    }
    render() {
        return (
            <div>
            <div className={style.row}>
            <label>Status</label>
            <div className={style.dropdownWrap}>
            <Dropdown
              placeholder='Batch Status'
              keyProp='name'
              canSelectPlaceholder
              onSelect={this.handleStatusSelect}
              data={this.props.batchStatuses}
              defaultSelected={this.props.statusValue}
              lable='Status'
            />
            </div>
            </div>
            <div className={style.row}>
            <label>Currency</label>
            <div className={style.dropdownWrap}>
            <Dropdown
              placeholder='Currency'
              keyProp='name'
              canSelectPlaceholder
              onSelect={this.handleCurrencySelect}
              data={currency}
              defaultSelected={this.props.currencyValue}
            />
            </div>
            </div>
            <div className={style.row}>
            <label>Transaction Type</label>
            <div className={style.dropdownWrap}>
            <Dropdown
              placeholder='Transaction Type'
              keyProp='name'
              canSelectPlaceholder
              onSelect={this.handleTransactionSelect}
              data={transactionType}
              defaultSelected={this.props.transactionTypeValue}
            />
            </div>
            </div>
            </div>
        );
    }
}

ByStatus.propTypes = {
    batchStatuses: PropTypes.array.isRequired,
    changeFilter: PropTypes.func.isRequired,
    fetchBatchStatuses: PropTypes.func.isRequired,
    statusValue: PropTypes.any,
    currencyValue: PropTypes.any,
    transactionTypeValue: PropTypes.any
};

export default connect(
    (state) => {
        return {
            batchStatuses: state.bulkBatch.get('batchStatuses').toJS(),
            statusValue: state.bulkBatch.getIn(['filters', 'batchStatusId']),
            currencyValue: state.bulkBatch.getIn(['filters', 'currency']) || null,
            transactionTypeValue: state.bulkBatch.getIn(['filters', 'transactionType']) || null
        };
    },
    {changeFilter, fetchBatchStatuses}
)(ByStatus);
