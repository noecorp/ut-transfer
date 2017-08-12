import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import { validateAll } from 'ut-front-react/utils/validator';

import TransferBudgetContainer from '../../../../containers/Transfer/Budget';
import {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData
} from '../actions';
import { prepareErrorsWithFullKeyPath } from './../../../../utils';
import { getTransferBUddgetValidations } from '../../../../containers/Transfer/Budget/validations';

import transferStyle from '../../style.css';

class TransferBudgetCreate extends Component {
//
    constructor(props) {
        super(props);
        this.createBudgetTransfer = this.createBudgetTransfer.bind(this);
    }

    componentWillMount() {
        this.props.setActiveTab({ mode: 'create', id: 'create' });
        this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
        this.props.fetchCustomerData();
        this.props.fetchAccounts();
    }

    translate(key) {
        return this.context.translate(key);
    }

    get actionButtons() {
        return [
            { text: this.translate('Create and Close'), onClick: this.createBudgetTransfer, styleType: 'primaryLight' },
            { text: this.translate('Create'), onClick: this.createBudgetTransfer },
            { text: this.translate('Close'), onClick: () => {} }
        ];
    }

    createBudgetTransfer() {
        let createValidationRules = getTransferBUddgetValidations();
        let validation = validateAll(this.props.data, createValidationRules);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
        }
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={this.translate('Transfer to the Budget')} />
                <div className={transferStyle.pageContainer}>
                    <Header
                      text={this.translate('Payment slip (transfer to the Budget)')}
                      buttons={this.actionButtons} />
                    <div className={transferStyle.transferContainer}>
                        <TransferBudgetContainer mode='create' id='create' />
                    </div>
                </div>
            </Page>
        );
    }
//
}

TransferBudgetCreate.contextTypes = {
    translate: PropTypes.func
};

TransferBudgetCreate.propTypes = {
    // State
    data: PropTypes.object,
    // ACtions
    getScreenConfiguration: PropTypes.func,
    fetchAccounts: PropTypes.func,
    fetchCustomerData: PropTypes.func,
    setActiveTab: PropTypes.func,
    setErrors: PropTypes.func
};

const mapStateToProps = ({ transfersBudget }, ownProps) => ({
    data: transfersBudget.getIn(['create', 'create', 'data'])
});
const mapDispatchToProps = {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
