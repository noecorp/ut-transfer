import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    getScreenConfiguration,
    fetchAccounts
} from '../../../../pages/Transfer/Budget/actions';

import style from './style.css';

class TransferBudgetCreate extends Component {
//
    componentWillMount() {
        this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
        this.props.fetchAccounts();
    }

    render() {
        return (<div>Transfer budget</div>);
    }
//
}

TransferBudgetCreate.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    getScreenConfiguration: PropTypes.func,
    fetchAccounts: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {
    getScreenConfiguration,
    fetchAccounts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
