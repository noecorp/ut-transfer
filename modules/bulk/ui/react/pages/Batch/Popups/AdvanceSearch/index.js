import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dropdown from './ByDropdown';
import Search from './BySearch';
import style from '../../../style.css';
import { changeFilter } from '../../actions';
import DatePicker from 'ut-front-react/components/DatePicker/Simple';

class Total extends Component {
    constructor(props) {
        super(props);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
    }
    handleChangeFrom(record) {
        this.props.changeFilter({'key': 'fromDate', value: record.value, requireFetch: false});
    }
    handleChangeTo(record) {
        this.props.changeFilter({'key': 'toDate', value: record.value, requireFetch: false});
    }
    render() {
        let FromDate = this.props.fromDate ? new Date(this.props.fromDate) : null;
        let ToDate = this.props.toDate ? new Date(this.props.toDate) : null;
        return (
        <div className={style.uploadForm}>
            <div className={style.row}><DatePicker label='Created From' defaultValue={FromDate} hintText='From Date' onChange={this.handleChangeFrom} /></div>
            <div className={style.row}><DatePicker label='To' defaultValue={ToDate} hintText='To Date' onChange={this.handleChangeTo} /></div>
            <div className={style.identityContainer}><Dropdown /></div>
            <div><Search /></div>
        </div>);
    }
}

Total.propTypes = {
    changeFilter: PropTypes.func.isRequired,
    fromDate: PropTypes.any,
    toDate: PropTypes.any
};
function mapStateToProps(state) {
    return {
        fromDate: state.bulkBatch.getIn(['filters', 'fromDate']),
        toDate: state.bulkBatch.getIn(['filters', 'toDate'])
    };
}

export default connect(
    mapStateToProps, {
        changeFilter
    })(Total);
