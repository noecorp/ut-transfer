import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ByStatus from './ByStatus';
import BySearch from './ByCustomSearch';
import ClearFilters from './Clear';
import {clearFilters} from '../actions';
import style from '../../style.css';

class Filters extends Component {
    render() {
        return (
        <div className={style.filterWrap}>
            <div className={style.filterSeparated}> <ByStatus /> </div>
            <div className={style.filterCustomSearch}> <BySearch /> </div>
            <div className={style.clearFilterWrap}><ClearFilters onClick={this.props.clearFilters} /></div>
        </div>);
    }
}

Filters.propTypes = {
    clearFilters: PropTypes.func
};

function mapStateToProps(state) {
    return {
    };
}

export default connect(
    mapStateToProps, {
        clearFilters
    })(Filters);
