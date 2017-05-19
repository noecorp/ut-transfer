import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Pagination from 'ut-core/ui/react/containers/Pagination';
import { updateGridPagination } from '../../actions';

class BatchGridPagination extends Component {
    render() {
        return (
            <div>
                <Pagination pagination={this.props.pagination} onUpdate={this.props.updateGridPagination} />
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
