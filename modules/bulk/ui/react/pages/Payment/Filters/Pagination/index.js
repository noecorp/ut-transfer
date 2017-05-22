import React, {Component, PropTypes} from 'react';
import immutable from 'immutable';
import {connect} from 'react-redux';
import AdvancedPagination from 'ut-front-react/components/AdvancedPagination';
import { updateGridPagination } from '../../actions';
import style from '../../../style.css';

var defaultPagination = {
    pageSize: 25,
    pageNumber: 1,
    recordsTotal: 0,
    pagesTotal: 0
};

class PaymentGridPagination extends Component {
    render() {
        return (
            <div className={style.paginationWrap}>
                <AdvancedPagination pagination={this.props.pagination} onUpdate={this.props.updateGridPagination} />
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
