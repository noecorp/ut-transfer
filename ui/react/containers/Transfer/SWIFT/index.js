import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Sender from './Sender';
import BankBeneficiary from './BankBeneficiary';
import Beneficiary from './Beneficiary';
import Transfer from './Transfer';
import style from './style.css';

import {changeField} from './actions';

class Swift extends Component {
    componentWillMount() {
        // fetch data for dropdowns
    }
    render() {
        return (
            <div className={style.contentBoxesWrapper}>
                <Sender />
                <BankBeneficiary />
                <Beneficiary />
                <Transfer />
            </div>
        );
    }
}

Swift.propTypes = {
    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(
    mapStateToProps,
    {changeField}
)(Swift);
