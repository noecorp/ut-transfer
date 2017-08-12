import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import { validateAll } from 'ut-front-react/utils/validator';

import ConfirmTransferPopup from '../../../../components/Transfer/ConfirmTransferPopup';
import TransferBudgetContainer from '../../../../containers/Transfer/Budget';
import {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData,
    editConfirmTransferPopupField,
    resetConfirmTransferPopupState
} from '../actions';
import { prepareErrorsWithFullKeyPath } from './../../../../utils';
import { getTransferBuddgetValidations } from '../../../../containers/Transfer/Budget/validations';
import { prepareTransferBudgetToSend } from '../helpers';

import transferStyle from '../../style.css';

const popups = {
    confirmTransfer: 'confirmTransfer'
};

class TransferBudgetCreate extends Component {
//
    constructor(props) {
        super(props);
        this.createBudgetTransfer = this.createBudgetTransfer.bind(this);
        this.confirmAndSendBudgetTransfer = this.confirmAndSendBudgetTransfer.bind(this);
        this.closeConfirmTransferPopup = this.closeConfirmTransferPopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.state = {
            isPopupOpen: {
                confirmTransfer: true
            }
        };
    }

    componentWillMount() {
        this.props.setActiveTab({ mode: 'create', id: 'create' });
        this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
        this.props.fetchCustomerData();
        this.props.fetchAccounts();
    }

    openPopup(which) {
        let isPopupOpen = this.state.isPopupOpen;
        isPopupOpen[which] = true;
        this.setState({ isPopupOpen });
    }

    closePopup(which) {
        let isPopupOpen = this.state.isPopupOpen;
        isPopupOpen[which] = false;
        this.setState({ isPopupOpen });
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
        let createValidationRules = getTransferBuddgetValidations();
        let validation = validateAll(this.props.data, createValidationRules);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
            return;
        }
        this.openPopup(popups.confirmTransfer);
    }

    confirmAndSendBudgetTransfer() {
        let password = this.props.confirmTransferPopup.getIn(['data', 'password']);
        let otp = this.props.confirmTransferPopup.getIn(['data', 'password']);
        let data = prepareTransferBudgetToSend(this.props.data);
    }

    closeConfirmTransferPopup() {
        this.props.resetConfirmTransferPopupState();
        this.closePopup(popups.confirmTransfer);
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
                <ConfirmTransferPopup
                  inputs={this.confirmTransferPopupInputs}
                  isOpen={this.state.isPopupOpen[popups.confirmTransfer]}
                  onConfirm={this.confirmAndSendBudgetTransfer}
                  onCancel={this.closeConfirmTransferPopup}
                />
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
    confirmTransferPopup: PropTypes.object,
    // ACtions
    getScreenConfiguration: PropTypes.func,
    editConfirmTransferPopupField: PropTypes.func,
    resetConfirmTransferPopupState: PropTypes.func,
    fetchAccounts: PropTypes.func,
    fetchCustomerData: PropTypes.func,
    setActiveTab: PropTypes.func,
    setErrors: PropTypes.func
};

const mapStateToProps = ({ transfersBudget }, ownProps) => ({
    data: transfersBudget.getIn(['create', 'create', 'data']),
    confirmTransferPopup: transfersBudget.getIn(['create', 'create', 'confirmTransferPopup'])
});

const mapDispatchToProps = {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData,
    editConfirmTransferPopupField,
    resetConfirmTransferPopupState
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
