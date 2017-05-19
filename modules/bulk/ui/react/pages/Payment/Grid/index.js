import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { fetchPayments, selectPayment, changeSortFilter } from '../actions';
import Grid from 'ut-front-react/components/Grid';
import mainStyle from 'ut-front-react/assets/index.css';

const sortableColumns = [true, true, true, true, true, true];

const linkableColumns = [true, false, false, false, false];

const fields = [
        {name: 'Sequence Number', key: 'sequenceNumber'},
        {name: 'Customer Name', key: 'customerName'},
        {name: 'Account ID', key: 'account'},
        {name: 'Currency', key: 'currency'},
        {name: 'Amount', key: 'amount'},
        {name: 'Status', key: 'paymentStatus'}
];

class BulkPaymentGrid extends Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.mapColumn = this.mapColumn.bind(this);
        this.fetchPayments = this.fetchPayments.bind(this);
    }
    componentWillMount() {
        this.fetchPayments({
            batchId: this.props.batchId
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.filterChanged && nextProps.filterChanged !== this.props.filterChanged) {
            let filters = nextProps.filters || this.props.filters;
            this.fetchPayments(Object.assign({}, filters.toJS(),
                {
                    pageSize: nextProps.pageSize,
                    pageNumber: nextProps.pageNumber,
                    batchId: nextProps.batchId
                }));
        } else if (this.props.filterChanged) {
            for (var row in this.refs.grid.refs) {
                if (this.refs.grid.refs[row].state.selected) {
                    this.refs.grid.refs[row].toggleSelect();
                }
            }
        }
        if (nextProps.batchId !== this.props.batchId) {
            this.fetchPayments({
                batchId: nextProps.batchId,
                pageSize: 25,
                pageNumber: 1
            });
        }
    }
    handleRefresh() {
        let { filters } = this.props;
        this.fetchPayments(Object.assign({}, filters.toJS(),
            {
                pageSize: this.props.pageSize,
                pageNumber: this.props.pageNumber,
                batchId: this.props.batchId
            }));
    }

    fetchPayments(params) {
        let { pageNumber, pageSize } = this.props;
        this.props.fetchPayments(params, { pageNumber, pageSize });
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

    handleSelect(payment, isSelected) {
        this.props.selectPayment(payment.toJS(), isSelected);
    }

    mapColumn(col, colData) {
        var self = this;
        switch (col.key) {
            case 'sequenceNumber':
                return <label onClick={function(e) {
                    if (!(self.props.selectedPayment && self.props.selectedPayment.get('sequenceNumber') === colData)) {
                        self.props.togglePopup('paymentDetailsPopup');
                    } else if (self.props.selectedPayment && self.props.selectedPayment.get('sequenceNumber') === colData) {
                        self.props.togglePopup('paymentDetailsPopup');
                        e.stopPropagation();
                    }
                }}>{colData}</label>;
            case 'updatedOn':
                return new Date(colData).toLocaleDateString();
            default:
                return colData;
        }
    }

    render() {
        let { payments } = this.props;
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
                  rows={payments}
                  mapColumn={this.mapColumn}
                />
            </div>
        );
    }
}

BulkPaymentGrid.propTypes = {
    payments: PropTypes.object.isRequired,
    filters: PropTypes.object,
    fetchPayments: PropTypes.func.isRequired,
    filterChanged: PropTypes.bool,
    selectPayment: PropTypes.func,
    togglePopup: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    changeSortFilter: PropTypes.func,
    batchTypeName: PropTypes.string.isRequired,
    batchId: PropTypes.string.isRequired
};

BulkPaymentGrid.defaultProps = {
    payments: Immutable.List([]),
    filters: {},
    filterChanged: false,
    pageSize: 25,
    pageNumber: 1
};

function mapStateToProps(state, ownProps) {
    window.state = state;
    return {
        payments: state.bulkPayment.get('payments'),
        filterChanged: state.bulkPayment.get('filterChanged'),
        filters: state.bulkPayment.get('filters'),
        pageSize: state.bulkPayment.getIn(['pagination', 'pageSize']),
        pageNumber: state.bulkPayment.getIn(['pagination', 'pageNumber']),
        selectedPayment: state.bulkPayment.get('selectedPayment')
    };
}

export default connect(
    mapStateToProps,
    {fetchPayments, selectPayment, changeSortFilter}
)(BulkPaymentGrid);
