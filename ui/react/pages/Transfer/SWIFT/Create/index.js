import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import Text from 'ut-front-react/components/Text';
import { validateAll } from 'ut-front-react/utils/validator';
import Vertical from 'ut-front-react/components/Layout/Vertical.js';

import ConfirmTransferPopup from '../../../../containers/Transfer/ConfirmTransferPopup';
import TransferSuccessPopup from '../../../../components/Transfer/TransferSuccessPopup';
import Swift from './../../../../containers/Transfer/SWIFT';

import { getTransferSWIFTValidations } from '../../../../containers/Transfer/SWIFT/validations';
import { prepareErrorsWithFullKeyPath } from './../../../../utils';
import {
    setActiveTab,
    setErrors,
    fetchAccounts,
    requestOTP,
    resetState,
    createTransfer
} from '../actions';
import { resetConfirmTransferPopupState } from './../../../../containers/Transfer/ConfirmTransferPopup/actions';
import { prepareTransferSwiftToSend, performCustomValidations } from '../helpers';
import { removeTab } from 'ut-front-react/containers/TabMenu/actions';

import transferStyle from '../../style.css';

const popups = {
    confirmTransfer: 'confirmTransfer',
    transferSuccess: 'transferSuccess'
};

class TransfersSWIFTCreate extends Component {
    constructor(props) {
        super(props);
        this.createSwift = this.createSwift.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmTransferPopup = this.closeConfirmTransferPopup.bind(this);
        this.closeTransferSuccessPopup = this.closeTransferSuccessPopup.bind(this);
        this.confirmAndSendSWIFTTransfer = this.confirmAndSendSWIFTTransfer.bind(this);
        this.state = {
            isPopupOpen: {
                confirmTransfer: false,
                transferSuccess: false
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

    get actionButtons() {
        const createAndClose = () => {
            this.createSwift();
        };
        const close = () => {
            this.props.resetState();
            this.props.resetConfirmTransferPopupState();
            this.props.removeTab(this.props.activeTab.pathname);
        };
        return [
            { text: this.translate('Send'), onClick: createAndClose, styleType: 'primaryLight' },
            { text: this.translate('Close'), onClick: close }
        ];
    }

    // Performs validation, if ok - opens confirm dialog.

    createSwift() {
        let createValidationRules = getTransferSWIFTValidations();
        let validation = validateAll(this.props.data, createValidationRules);
        performCustomValidations(this.props.data, validation);
        // TODO: add validation for routing number only when USA is selected as country
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
            return;
        }
        this.openPopup(popups.confirmTransfer);
        this.props.requestOTP(this.props.data.getIn(['sender', 'bank']), this.props.data.getIn(['sender', 'phone']));
    }

    confirmAndSendSWIFTTransfer() {
        let password = this.props.confirmTransferPopup.getIn(['data', 'password']);
        let otp = this.props.confirmTransferPopup.getIn(['data', 'otp']);
        let data = prepareTransferSwiftToSend(this.props.data, { password, otp });
        this.props.createTransfer(data)
            .then(result => {
                if (result.error) throw result.error;
                this.closeConfirmTransferPopup();
                this.openPopup(popups.transferSuccess);
                return true;
            }).catch(_ => {
                // An error is thrown and the error popup is shown here.
                this.closeConfirmTransferPopup();
            });
    }

    closeConfirmTransferPopup() {
        this.props.resetConfirmTransferPopupState();
        this.closePopup(popups.confirmTransfer);
    }

    // When transfer is successfull, and ok is pressed - close the success popup and remove the tab.

    closeTransferSuccessPopup() {
        this.closePopup(popups.transferSuccess);
        this.props.resetState();
        this.props.removeTab(this.props.activeTab.pathname);
    }

    translate(key) {
        return this.context.translate(key);
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersSWIFT')} title={'SWIFT Transfers'} />
                <Vertical fixedComponent={<Header text={<Text>SWIFT Transfers</Text>} buttons={this.actionButtons} />}>
                    <div className={transferStyle.pageContainer}>
                        <div className={transferStyle.transferTopContainer}>
                            <Text>All fields in SWIFT payment form are filled with latin characters.</Text>
                        </div>
                        <Swift mode='create' id='create' />
                        <div className={transferStyle.transferBottomContainer}>
                            <Text>I am aware that I bear criminal liability under article 313 of the Criminal Code when declaring wrong facts.</Text>
                        </div>
                    </div>
                </Vertical>
                <ConfirmTransferPopup
                  isOpen={this.state.isPopupOpen[popups.confirmTransfer]}
                  onConfirm={this.confirmAndSendSWIFTTransfer}
                  onCancel={this.closeConfirmTransferPopup}
                />
                <TransferSuccessPopup
                  isOpen={this.state.isPopupOpen[popups.transferSuccess]}
                  onOk={this.closeTransferSuccessPopup}
                />
            </Page>
        );
    }
}

TransfersSWIFTCreate.contextTypes = {
    translate: PropTypes.func
};

TransfersSWIFTCreate.propTypes = {
    // state
    activeTab: PropTypes.object,
    data: PropTypes.object.isRequired,
    confirmTransferPopup: PropTypes.object,
    // actions
    setActiveTab: PropTypes.func,
    setErrors: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    requestOTP: PropTypes.func,
    removeTab: PropTypes.func,
    resetConfirmTransferPopupState: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    createTransfer: PropTypes.func.isRequired
};

const mapStateToProps = ({ transferSwift, tabMenu, transferConfirmPopup }, ownProps) => {
    return {
        confirmTransferPopup: transferConfirmPopup,
        activeTab: tabMenu.active,
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
    resetState,
    createTransfer
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransfersSWIFTCreate);
