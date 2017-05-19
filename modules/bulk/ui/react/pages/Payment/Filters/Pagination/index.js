import React, {Component, PropTypes} from 'react';
import immutable from 'immutable';
import {connect} from 'react-redux';
import Pagination from 'ut-core/ui/react/containers/Pagination';
import { updateGridPagination } from '../../actions';

var defaultPagination = {
    pageSize: 25,
    pageNumber: 1,
    recordsTotal: 0,
    pagesTotal: 0
};

class PaymentGridPagination extends Component {
    render() {
        return (
            <div>
                <Pagination pagination={this.props.pagination} onUpdate={this.props.updateGridPagination} />
            </div>
        );
    }
}

PaymentGridPagination.propTypes = {
    pagination: PropTypes.object,
    updateGridPagination: PropTypes.func
};

export default connect(
    (state, ownProps) => {
        return {
            pagination: state.bulkPayment.get('pagination') || immutable.fromJS(defaultPagination)
        };
    },
    {
        updateGridPagination
    }
)(PaymentGridPagination);
