import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import Text from 'ut-front-react/components/Text';
import { validateAll } from 'ut-front-react/utils/validator';

import ConfirmTransferPopup from '../../../../containers/Transfer/ConfirmTransferPopup';
import Swift from './../../../../containers/Transfer/SWIFT';

import { getTransferValidations } from './../../../../containers/Transfer/SWIFT/Transfer/validations';
import { getSenderValidations } from './../../../../containers/Transfer/SWIFT/Sender/validations';
import { getBeneficiaryValidations } from './../../../../containers/Transfer/SWIFT/Beneficiary/validations';
import { getBankBeneficiaryValidations } from './../../../../containers/Transfer/SWIFT/BankBeneficiary/validations';
import { getAMLValidations } from './../../../../containers/Transfer/SWIFT/AMLDeclaration/validations';
import { prepareErrorsWithFullKeyPath } from './../../../../utils';
import { setActiveTab, setErrors, fetchAccounts, requestOTP, resetConfirmTransferPopupState, resetState } from '../actions';

import { prepareTransferBudgetToSend, performCustomValidations } from '../helpers';
import { removeTab } from 'ut-front-react/containers/TabMenu/actions';

import transferStyle from '../../style.css';

const popups = {
    confirmTransfer: 'confirmTransfer'
};

class TransfersSWIFTCreate extends Component {
    constructor(props) {
        super(props);
        this.createSwift = this.createSwift.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmTransferPopup = this.closeConfirmTransferPopup.bind(this);
        this.state = {
            isPopupOpen: {
                confirmTransfer: false
            }
        };
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

    componentWillMount() {
        this.props.setActiveTab({ mode: 'create', id: 'create' });
    }

    componentDidMount() {
        this.props.fetchAccounts();
    }

    createSwift() {
        let createValidationRules = [
            ...getSenderValidations(),
            ...getBankBeneficiaryValidations(),
            ...getBeneficiaryValidations(),
            ...getTransferValidations(),
            ...getAMLValidations()
        ];
        let validation = validateAll(this.props.data, createValidationRules);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
            return;
        }
        this.openPopup(popups.confirmTransfer);
        this.props.requestOTP();
    }

    get actionButtons() {
        const createAndClose = () => {
            this.createSwift();
            this.onTransferSentHandler = () => {
                this.closePopup(popups.confirmTransfer);
                this.props.resetState();
                this.props.removeTab(this.props.activeTab.pathname);
            };
        };
        const create = () => {
            this.createSwift();
            this.onTransferSentHandler = () => {
                this.closePopup(popups.confirmTransfer);
                this.props.resetState();
            };
        };
        const close = () => {
            this.props.removeTab(this.props.activeTab.pathname);
        };
        return [
            { text: this.translate('Create and Close'), onClick: createAndClose, styleType: 'primaryLight' },
            { text: this.translate('Create'), onClick: create },
            { text: this.translate('Close'), onClick: close }
        ];
    }

    createBudgetTransfer() {
        let createValidationRules = getTransferBuddgetValidations();
        let validation = validateAll(this.props.data, createValidationRules);
        performCustomValidations(this.props.data, validation);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
            return;
        }
        this.openPopup(popups.confirmTransfer);
        this.props.requestOTP();
    }

    confirmAndSendBudgetTransfer() {
        let password = this.props.confirmTransferPopup.getIn(['data', 'password']);
        let otp = this.props.confirmTransferPopup.getIn(['data', 'otp']);
        let data = prepareTransferBudgetToSend(this.props.data, { password, otp });
        this.props.createTransfer(data);
        this.onTransferSentHandler();
    }

    closeConfirmTransferPopup() {
        this.props.resetConfirmTransferPopupState();
        this.closePopup(popups.confirmTransfer);
    }

    translate(key) {
        return this.context.translate(key);
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersSWIFT')} title={'SWIFT Transfers'} />
                <div className={transferStyle.pageContainer}>
                    <Header text={<Text>SWIFT Transfers</Text>} buttons={this.actionButtons} />
                    <Swift mode='create' id='create' />
                </div>
                <ConfirmTransferPopup
                  isOpen={this.state.isPopupOpen[popups.confirmTransfer]}
                  onConfirm={this.confirmAndSendBudgetTransfer}
                  onCancel={this.closeConfirmTransferPopup}
                />
            </Page>
        );
    }
}

TransfersSWIFTCreate.contextTypes = {
    translate: PropTypes.func
};

TransfersSWIFTCreate.propTypes = {
    setActiveTab: PropTypes.func,
    data: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    requestOTP: PropTypes.func,
    removeTab: PropTypes.func,
    resetConfirmTransferPopupState: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired
};

const mapStateToProps = ({ transferSwift }, ownProps) => {
    return {
        data: transferSwift.getIn(['create', 'create', 'data'])
    };
};

const mapDispatchToProps = {
    setActiveTab,
    setErrors,
    fetchAccounts,
    requestOTP,
    removeTab,
    resetConfirmTransferPopupState,
    resetState
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransfersSWIFTCreate);
