import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import { validateAll } from 'ut-front-react/utils/validator';
import { removeTab } from 'ut-front-react/containers/TabMenu/actions';
import Button from 'ut-front-react/components/Button';
import Text from 'ut-front-react/components/Text';

import ConfirmTransferPopup from '../../../../containers/Transfer/ConfirmTransferPopup';
import TemplatesPopup from '../../../../components/Transfer/TemplatesPopup';
import SaveTemplatePopup from '../../../../components/Transfer/SaveTemplatePopup';
import TransferBudgetContainer from '../../../../containers/Transfer/Budget';
import TransferSuccessPopup from '../../../../components/Transfer/TransferSuccessPopup';
import {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchTemplates,
    fetchCustomerData,
    createTransfer,
    resetTransferState,
    requestOTP,
    applyTemplate,
    createTemplate
} from '../actions';
import { resetConfirmTransferPopupState } from './../../../../containers/Transfer/ConfirmTransferPopup/actions';
import { prepareErrorsWithFullKeyPath } from './../../../../utils';
import { getTransferBuddgetValidations } from '../../../../containers/Transfer/Budget/validations';
import {
    prepareTransferBudgetToSend,
    prepareTemplateToCreate,
    performCustomValidations
} from '../helpers';

import transferStyle from '../../style.css';

const popups = {
    confirmTransfer: 'confirmTransfer',
    transferSuccess: 'transferSuccess',
    templates: 'templates',
    saveTemplate: 'saveTemplate'
};

class TransferBudgetCreate extends Component {
    constructor(props) {
        super(props);
        this.createBudgetTransfer = this.createBudgetTransfer.bind(this);
        this.confirmAndSendBudgetTransfer = this.confirmAndSendBudgetTransfer.bind(this);
        this.closeConfirmTransferPopup = this.closeConfirmTransferPopup.bind(this);
        this.loadTemplate = this.loadTemplate.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.state = {
            isPopupOpen: {
                confirmTransfer: false,
                templates: false,
                saveTemplate: false,
                transferSuccess: false
            }
        };
    }

    componentWillMount() {
        this.props.setActiveTab({ mode: 'create', id: 'create' });
        // this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
        // this.props.fetchCustomerData();
        this.props.fetchAccounts();
        this.props.fetchTemplates();
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
        const createAndClose = () => {
            this.createBudgetTransfer();
            this.onTransferSentHandler = () => {
                this.closePopup(popups.confirmTransfer);
                this.props.resetTransferState();
                this.props.resetConfirmTransferPopupState();
                this.props.removeTab(this.props.activeTab.pathname);
            };
        };
        const create = () => {
            this.createBudgetTransfer();
            this.onTransferSentHandler = () => {
                this.closePopup(popups.confirmTransfer);
                this.props.resetTransferState();
                this.props.fetchAccounts();
                this.props.resetConfirmTransferPopupState();
            };
        };
        const close = () => {
            this.props.resetConfirmTransferPopupState();
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
        this.props.requestOTP(this.props.data.get('sourceBank'), this.props.data.get('phone'));
    }

    confirmAndSendBudgetTransfer() {
        let password = this.props.confirmTransferPopup.getIn(['data', 'password']);
        let otp = this.props.confirmTransferPopup.getIn(['data', 'otp']);
        let data = prepareTransferBudgetToSend(this.props.data, { password, otp });
        this.props.createTransfer(data).then(result => {
            if (result.error) throw result.error;
            this.onTransferSentHandler();
            return true;
        }).catch(_ => {
            this.closeConfirmTransferPopup();
        });
    }

    closeConfirmTransferPopup() {
        this.props.resetConfirmTransferPopupState();
        this.props.fetchAccounts();
        this.props.fetchTemplates();
        this.closePopup(popups.confirmTransfer);
    }

    // Template handling

    loadTemplate(selectedTemplateKey) {
        this.props.applyTemplate(selectedTemplateKey);
        this.closePopup(popups.templates);
    }

    saveTemplate(name) {
        let templateData = prepareTemplateToCreate(this.props.data);
        this.props.createTemplate({ name, data: templateData }).then(_ => {
            this.props.fetchTemplates();
            return true;
        }).catch();
        this.closePopup(popups.saveTemplate);
    }

    renderHeader() {
        return (
            <div className={transferStyle.formHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in diam ultricies, aliquam ligula eget, lobortis mauris. Duis ultricies euismod gravida. Etiam posuere leo sit amet turpis malesuada, eget vehicula nisi semper. Pellentesque quis semper dolor. Integer dolor mauris, volutpat eget consequat vitae, imperdiet in nunc. </div>
        );
    }

    renderTemplatesSection() {
        const buttonStyles = {};
        const onTemplateSelectClick = () => {
            this.openPopup(popups.templates);
        };
        const onSaveTemplateClick = () => {
            this.openPopup(popups.saveTemplate);
        };
        return (
            <div className={transferStyle.templatesSection}>
                <div className={transferStyle.templatesButton}>
                    <Button sizeType='small' style={buttonStyles} onClick={onTemplateSelectClick} >{this.translate('Select a template')}</Button>
                </div>
                <div className={transferStyle.templatesButton}>
                    <Button sizeType='small' onClick={onSaveTemplateClick} >{this.translate('Save as a template')}</Button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={this.translate('Transfer to the Budget')} />
                <div className={transferStyle.pageContainer}>
                    <Header
                      text={<Text>Payment slip (Transfer to the Budget)</Text>}
                      buttons={this.actionButtons} />
                    {this.renderTemplatesSection()}
                    <div className={transferStyle.transferContainer}>
                        <TransferBudgetContainer mode='create' id='create' />
                    </div>
                    <div className={transferStyle.transferBottomContainer}>
                        <Text>I am aware that I bear criminal liability under article 313 of the Criminal Code when declaring wrong facts.</Text>
                    </div>
                </div>
                <ConfirmTransferPopup
                  isOpen={this.state.isPopupOpen[popups.confirmTransfer]}
                  onConfirm={this.confirmAndSendBudgetTransfer}
                  onCancel={this.closeConfirmTransferPopup}
                />
                <TemplatesPopup
                  isOpen={this.state.isPopupOpen[popups.templates]}
                  onLoad={this.loadTemplate}
                  onCancel={() => { this.closePopup(popups.templates); }}
                  templates={this.props.templates}
                />
                <SaveTemplatePopup
                  isOpen={this.state.isPopupOpen[popups.saveTemplate]}
                  onSave={this.saveTemplate}
                  onCancel={() => { this.closePopup(popups.saveTemplate); }}
                />
                <TransferSuccessPopup
                  isOpen={this.state.isPopupOpen[popups.transferSuccess]}
                  onOk={() => { this.closePopup(popups.transferSuccess); }}
                />
            </Page>
        );
    }
}

TransferBudgetCreate.contextTypes = {
    translate: PropTypes.func
};

TransferBudgetCreate.propTypes = {
    // State
    data: PropTypes.object,
    confirmTransferPopup: PropTypes.object,
    activeTab: PropTypes.object,
    templates: PropTypes.array,
    // Actions
    getScreenConfiguration: PropTypes.func,
    resetConfirmTransferPopupState: PropTypes.func,
    fetchAccounts: PropTypes.func,
    fetchTemplates: PropTypes.func,
    fetchCustomerData: PropTypes.func,
    setActiveTab: PropTypes.func,
    setErrors: PropTypes.func,
    createTransfer: PropTypes.func,
    resetTransferState: PropTypes.func,
    removeTab: PropTypes.func,
    requestOTP: PropTypes.func,
    applyTemplate: PropTypes.func,
    createTemplate: PropTypes.func
};

const mapStateToProps = ({ transfersBudget, tabMenu, transferConfirmPopup }, ownProps) => ({
    confirmTransferPopup: transferConfirmPopup,
    activeTab: tabMenu.active,
    data: transfersBudget.getIn(['create', 'create', 'data']),
    templates: transfersBudget.getIn(['templates']).toJS()
});

const mapDispatchToProps = {
    setActiveTab,
    setErrors,
    getScreenConfiguration,
    fetchAccounts,
    fetchTemplates,
    fetchCustomerData,
    resetConfirmTransferPopupState,
    createTransfer,
    resetTransferState,
    removeTab,
    requestOTP,
    applyTemplate,
    createTemplate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
