import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import AdvancedPagination from 'ut-front-react/components/AdvancedPagination';
import { updateGridPagination } from '../../actions';
import style from '../../../style.css';

class BatchGridPagination extends Component {
    render() {
        return (
            <div className={style.paginationWrap}>
                <AdvancedPagination pagination={this.props.pagination} onUpdate={this.props.updateGridPagination} />
            </div>
        );
    }
}

BatchGridPagination.propTypes = {
    pagination: PropTypes.object,
    updateGridPagination: PropTypes.func
};

export default connect(
    (state, ownProps) => {
        return {
            pagination: state.bulkBatch.get('pagination')
        };
    },
    {
        updateGridPagination
    }
)(BatchGridPagination);
