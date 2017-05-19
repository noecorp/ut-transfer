import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {getLink} from 'ut-front/react/routerHelper';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import resizibleTypes from 'ut-front-react/components/ResiziblePageLayout/resizibleTypes';
import ResizibleContainer from 'ut-front-react/components/ResiziblePageLayout/Container';
import GridToolbox from 'ut-front-react/components/SimpleGridToolbox';
import ConfirmRejectionDialog from 'ut-front-react/components/ConfirmRejectionDialog';
import Popup from 'ut-front-react/components/Popup';
import mainStyle from 'ut-front-react/assets/index.css';
import style from '../style.css';
import Filters from './Filters';
import Toolbox from './ToolBox';
import BulkPaymentGrid from './Grid';
import Pagination from './Filters/Pagination';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import Details from './Popups/Details';

const defaultAsideWidth = 200;
const popUps = {
    paymentDetailsPopup: 'paymentDetailsPopup'
};
const messages = {
    reject: 'Are you sure you want to reject the batch?',
    pay: 'Are you sure you want to process the batch?',
    ready: 'Are you sure you want to submit the batch?'
};
const batchActions = {
    reject: 'rejectBatch',
    pay: 'processBatch',
    ready: 'readyBatch'
};
class BulkPayment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isPopupOpen: false,
            popupFor: ''
        };
        this.changeBatchStatus = this.changeBatchStatus.bind(this);
        this.showReasonDialog = this.showReasonDialog.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.permissions = {
            canEdit: this.context.checkPermission('bulk.payment.edit')
        };
    }
    toggleFilter() {
        this.props.actions.toggleFilter();
    }
    componentWillMount() {
        if (this.props.params.batchId) {
            this.props.actions.getPaymentBatch(this.props.params.batchId);
        }
    }
    componentWillReceiveProps(nextProps) {
        if ((this.props.params.batchId !== nextProps.params.batchId) ||
            (nextProps.batchChanged && nextProps.batchChanged !== this.props.batchChanged)) {
            this.props.actions.getPaymentBatch(this.props.params.batchId);
        }
        if (nextProps.paymentBatch.get('batchId') !== this.props.paymentBatch.get('batchId')) {
            this.props.actions
            .changeTabTitle(getLink('ut-transfer:bulkPayment', {batchId: this.props.params.batchId, batchTypeName: this.props.batchTypeName}),
            'Bulk Payments - ' + nextProps.paymentBatch.get('name'));
        }
    }
    togglePopup(popupFor) {
        this.setState({
            isPopupOpen: !this.state.isPopupOpen,
            popupFor: popupFor
        });
    }
    getDetailsAction() {
        let buttons = []; var self = this;
        var canEditByStatus = this.props.selectedPayment && ['new', 'rejected'].includes(this.props.paymentBatch.get('status').toLowerCase());
        if (this.permissions.canEdit && canEditByStatus) {
            buttons.push({
                label: 'Save',
                type: 'submit',
                onClick: () => {
                    let {paymentDetails} = self.props;
                    self.props.actions.savePayment(paymentDetails);
                    self.togglePopup();
                },
                styleType: 'primaryDialog'
            });
        }
        buttons.push({
            label: 'Cancel',
            onClick: this.togglePopup,
            styleType: 'secondaryDialog'
        });
        return buttons;
    }
    getPopupActions() {
        switch (this.state.popupFor) {
            case popUps.paymentDetailsPopup:
                return this.getDetailsAction();
            default:
                return [{
                    label: 'Cancel',
                    onClick: this.togglePopup,
                    styleType: 'secondaryDialog'
                }];
        }
    }
    changeStatusWithReason({batchId, actionName}) {
        let {confirmDialog} = this.props;
        this.props.actions.changeBatchStatus({batchId, actionName, reason: confirmDialog.get('value')});
        this.props.actions.closeConfirmDialog();
    }
    showReasonDialog({actionName, confirmMessage}) {
        let {openConfirmDialog, closeConfirmDialog} = this.props.actions;
        let {paymentBatch, confirmDialog} = this.props;
        var self = this;
        var batchId = paymentBatch.get('batchId');
        let reasonDialogConfig = {
            isOpen: true,
            showInput: true,
            title: 'Enter reject reason',
            message: '',
            buttons: [
                {
                    label: actionName === batchActions.reject ? 'Reject' : 'Submit',
                    onClick: () => {
                        self.changeStatusWithReason({batchId, actionName});
                    },
                    disabled: !confirmDialog.get('canSubmit')
                },
                {label: 'Cancel', onClick: closeConfirmDialog}
            ]
        };
        let config = {
            isOpen: true,
            showInput: false,
            message: confirmMessage,
            buttons: [
                {
                    label: actionName === batchActions.reject ? 'Reject' : 'Submit',
                    onClick: () => {
                        closeConfirmDialog();
                        openConfirmDialog(reasonDialogConfig);
                    }
                },
                {label: 'Cancel', onClick: closeConfirmDialog}
            ]
        };
        openConfirmDialog(config);
    }
    changeBatchStatus({actionName, confirmMessage}) {
        let {openConfirmDialog, closeConfirmDialog, changeBatchStatus} = this.props.actions;
        let {paymentBatch} = this.props;
        var batchId = paymentBatch.get('batchId');
        let config = {
            isOpen: true,
            showInput: false,
            message: confirmMessage,
            buttons: [
                {
                    label: actionName === batchActions.ready ? 'Ready Batch' : actionName === batchActions.pay ? 'Pay Batch' : 'Submit',
                    onClick: () => {
                        debugger;
                        changeBatchStatus({batchId, actionName});
                        closeConfirmDialog();
                    }
                },
                {label: 'Cancel', onClick: closeConfirmDialog}
            ]
        };
        openConfirmDialog(config);
    }
    getHeaderButtons() {
        let buttons = [];
        let {canBatchReady, canPayRejectBatch} = this.props;
        this.context.checkPermission('bulk.batch.ready') && canBatchReady &&
            buttons.push({text: 'Batch Ready',
                onClick: () => { this.changeBatchStatus({actionName: 'readyBatch', confirmMessage: messages.ready}); },
                disabled: !this.props.canBatchReady});
        this.context.checkPermission('bulk.batch.pay') && canPayRejectBatch &&
            buttons.push({text: 'Pay batch',
                onClick: () => { this.changeBatchStatus({actionName: 'processBatch', confirmMessage: messages.pay}); },
                disabled: !this.props.canPayRejectBatch});
        this.context.checkPermission('bulk.batch.reject') && canPayRejectBatch &&
            buttons.push({text: 'Reject Batch',
                onClick: () => { this.showReasonDialog({actionName: 'rejectBatch', confirmMessage: messages.reject}); },
                disabled: !this.props.canPayRejectBatch});

        return buttons;
    }
    getPopUpContent() {
        var canEditByStatus = this.props.selectedPayment && ['new', 'rejected'].includes(this.props.paymentBatch.get('status').toLowerCase());
        switch (this.state.popupFor) {
            case popUps.paymentDetailsPopup:
                return (<Details paymentId={this.props.selectedPayment.get('paymentId')} canEdit={this.permissions.canEdit && canEditByStatus} />);
            default:
                return null;
        }
    }
    getPopUpTitle() {
        switch (this.state.popupFor) {
            case popUps.paymentDetailsPopup:
                return 'Payment Details';
            default:
                return null;
        }
    }
    render() {
        var self = this;
        let {selectedPayment, errors, confirmDialog, batchTypeName} = this.props;
        let {updateErrors, changeConfirmDialogValue} = this.props.actions;
        let contentNormalWidth = window.innerWidth - defaultAsideWidth;
        var content = (
            <div className={mainStyle.contentTableWrap}>
                <div className={mainStyle.actionBarWrap}>
                  {
                    <GridToolbox
                      title={selectedPayment && !self.props.showFilter ? 'Show Filters' : selectedPayment ? 'Show Buttons' : 'Filter by'}
                      toggle={this.toggleFilter}
                      isTitleLink={!!selectedPayment}
                      opened>
                      { selectedPayment && !self.props.showFilter ? (
                        <div className={style.actionWrap}>
                        <Toolbox togglePopup={this.togglePopup} />
                        </div>
                      ) : <Filters />}
                    </GridToolbox>
                 }
                </div>
                 <BulkPaymentGrid batchTypeName={batchTypeName} batchId={this.props.params.batchId} togglePopup={this.togglePopup} />
                 <Pagination />
            </div>
        );
        var resizibleContainerCols = [
            {type: resizibleTypes.CONTENT, id: 'roleContent', width: contentNormalWidth, normalWidth: contentNormalWidth, child: content}
        ];
        return (
            <div>
                <AddTab pathname={getLink('ut-transfer:bulkPayment', {batchId: this.props.params.batchId, batchTypeName: this.props.batchTypeName})}
                  title={'Bulk Payments - ' + this.props.paymentBatch.get('name') || ''} />
                <Header text={this.props.paymentBatch.get('name') + '-' + this.props.paymentBatch.get('status')}
                  buttons={this.getHeaderButtons()} />
                <ResizibleContainer cols={resizibleContainerCols} />
                <Popup
                  isOpen={self.state.isPopupOpen}
                  header={{text: this.getPopUpTitle()}}
                  closePopup={self.togglePopup}
                  footer={{actionButtons: this.getPopupActions()}}>
                  {this.getPopUpContent()}
                </Popup>
                <ConfirmRejectionDialog
                  title={confirmDialog.get('title')}
                  buttons={confirmDialog.get('buttons')}
                  isOpen={confirmDialog.get('isOpen')}
                  showInput={confirmDialog.get('showInput')}
                  message={confirmDialog.get('message')}
                  value={confirmDialog.get('value')}
                  errors={errors}
                  canSubmit={confirmDialog.get('canSubmit')}
                  changeConfirmDialogValue={changeConfirmDialogValue}
                  updateErrors={updateErrors}
                  />
            </div>
        );
    }
}

BulkPayment.propTypes = {
    selectedPayment: PropTypes.object,
    showFilter: PropTypes.bool,
    errors: PropTypes.object,
    paymentProfile: PropTypes.object,
    paymentDetails: PropTypes.object,
    batchTypeName: PropTypes.string,
    actions: PropTypes.object,
    params: PropTypes.object,
    paymentBatch: PropTypes.object,
    canPayRejectBatch: PropTypes.bool,
    canBatchReady: PropTypes.bool,
    changeConfirmDialogValue: PropTypes.func,
    updateErrors: PropTypes.func,
    confirmDialog: PropTypes.object,
    batchChanged: PropTypes.bool
};

BulkPayment.contextTypes = {
    checkPermission: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    var statusCode = (state.bulkPayment.getIn(['paymentBatch', 'status']) || '').toLowerCase();
    return {
        batchTypeName: ownProps.params.batchTypeName,
        selectedPayment: state.bulkPayment.get('selectedPayment'),
        showFilter: state.bulkPayment.get('showFilter'),
        paymentDetails: state.bulkPayment.get('paymentDetails'),
        paymentBatch: state.bulkPayment.get('paymentBatch'),
        canPayRejectBatch: ['ready'].includes(statusCode),
        canBatchReady: ['new', 'rejected'].includes(statusCode),
        confirmDialog: state.bulkPayment.get('confirmDialog'),
        batchChanged: state.bulkPayment.get('batchChanged'),
        errors: state.bulkPayment.get('errors')
    };
}
export default connect(mapStateToProps, (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(BulkPayment);
