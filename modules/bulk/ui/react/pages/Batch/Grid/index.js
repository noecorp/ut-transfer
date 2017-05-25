import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { fetchBatches, selectBatch, changeSortFilter } from '../actions';
import Grid from 'ut-front-react/components/Grid';
import mainStyle from 'ut-front-react/assets/index.css';
import {Link} from 'react-router';

const sortableColumns = [true, true, true, true, true, true, true];
const linkableColumns = [false, false, false, false, false, false];

const fields = [
        {name: 'Batch ID', key: 'batchId'},
        {name: 'Batch Name', key: 'name'},
        {name: 'Number of Records', key: 'paymentsCount'},
        {name: 'Currency', key: 'currency'},
        {name: 'Total Amount', key: 'totalAmount'},
        {name: 'Status Date', key: 'updatedOn'},
        {name: 'Status', key: 'status'}
];

class BulkBatchGrid extends Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.mapColumn = this.mapColumn.bind(this);
        this.fetchBatches = this.fetchBatches.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.filterChanged && nextProps.filterChanged !== this.props.filterChanged) {
            let filters = nextProps.filters || this.props.filters;
            this.fetchBatches(Object.assign({}, filters.toJS(),
                {
                    pageSize: nextProps.pageSize,
                    pageNumber: nextProps.pageNumber,
                    batchTypeId: nextProps.batchType.key
                }));
        } else if (nextProps.batchType.key !== this.props.batchType.key) {
            this.fetchBatches({
                batchTypeId: nextProps.batchType.key,
                pageSize: 25,
                pageNumber: 1
            });
        } else if (!nextProps.filterChanged && this.props.filterChanged) {
            for (var row in this.refs.grid.refs) {
                if (this.refs.grid.refs[row].state.selected) {
                    this.refs.grid.refs[row].toggleSelect();
                }
            }
        }
    }
    handleRefresh() {
        let { filters } = this.props;
        this.fetchBatches(Object.assign({}, filters.toJS(),
            {
                pageSize: this.props.pageSize,
                pageNumber: this.props.pageNumber,
                batchTypeId: this.props.batchType.key
            }));
    }

    fetchBatches(params) {
        this.props.fetchBatches(params);
    }

    handleSort(col, val) {
        let sortBy;
        let sortOrder;
        if (val !== 0) {
            sortBy = col;
            sortOrder = val === 2 ? 'DESC' : 'ASC';
        };
        this.props.changeSortFilter(sortBy, sortOrder);
    }

    handleSelect(batch, isSelected) {
        let { selectBatch } = this.props;
        selectBatch(batch.toJS(), isSelected);
    }

    mapColumn(col, colData) {
        switch (col.key) {
            case 'batchId':
                return (<Link to={'/bulk/batch/' + this.props.batchTypeName + '/' + colData}>{colData}</Link>);
            case 'updatedOn':
                return new Date(colData).toLocaleDateString();
            default:
                return colData;
        }
    }

    render() {
        let { batches } = this.props;
        return (
            <div className={mainStyle.tableWrap}>
                <Grid
                  ref='grid'
                  canCheck={false}
                  columns={fields}
                  sortableColumns={sortableColumns}
                  linkableColumns={linkableColumns}
                  onSelect={this.handleSelect}
                  onSort={this.handleSort}
                  onRefresh={this.handleRefresh}
                  rows={batches}
                  mapColumn={this.mapColumn}
                />
            </div>
        );
    }
}

BulkBatchGrid.propTypes = {
    batches: PropTypes.object.isRequired,
    filters: PropTypes.object,
    fetchBatches: PropTypes.func.isRequired,
    filterChanged: PropTypes.bool,
    selectBatch: PropTypes.func,
    togglePopup: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    changeSortFilter: PropTypes.func,
    batchTypeName: PropTypes.string.isRequired,
    batchType: PropTypes.object
};

BulkBatchGrid.defaultProps = {
    batches: Immutable.List([]),
    filters: {},
    filterChanged: false,
    pageSize: 25,
    pageNumber: 1
};
function getBatchType(batchTypeName, batchTypes) {
    var batchCode = batchTypeName === 'debit' ? 'bulkDebitInternal'
        : batchTypeName === 'credit' ? 'bulkCreditInternal' : batchTypeName === 'merchants' ? 'bulkCreditMerchant' : '';
    return batchTypes.find(function(bt) {
        return bt.code === batchCode;
    });
}
function mapStateToProps(state, ownProps) {
    return {
        batches: state.bulkBatch.get('batches'),
        filterChanged: state.bulkBatch.get('filterChanged'),
        filters: state.bulkBatch.get('filters'),
        pageSize: state.bulkBatch.getIn(['pagination', 'pageSize']),
        pageNumber: state.bulkBatch.getIn(['pagination', 'pageNumber']),
        selectedBatch: state.bulkBatch.get('selectedBatch'),
        batchType: getBatchType(ownProps.batchTypeName, state.bulkBatch.get('batchTypes').toJS()) || {}
    };
}

export default connect(
    mapStateToProps,
    {fetchBatches, selectBatch, changeSortFilter}
)(BulkBatchGrid);
