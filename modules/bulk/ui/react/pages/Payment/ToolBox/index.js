import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'ut-front-react/components/StandardButton';
import {openConfirmDialog, closeConfirmDialog,
    deleteBatch, updateErrors, changeConfirmDialogValue, changePaymentStatus} from '../actions';
import ConfirmRejectionDialog from 'ut-front-react/components/ConfirmRejectionDialog';
import style from '../../style.css';

const messages = {
    delete: 'Are you sure you want to delete the selected record?',
    disable: 'Are you sure you want to disable the selected record?',
    verify: 'Are you sure you want to verify the selected record?'
};

class PaymentToolBox extends Component {
    constructor(props, context) {
        super(props);
        this.changePaymentStatus = this.changePaymentStatus.bind(this);
        this.permissions = {
            canVerify: context.checkPermission('bulk.batch.verify'),
            canDisable: context.checkPermission('bulk.payment.disable')
        };
    }
    changePaymentStatus({statusCode, confirmMessage}) {
        let {selectedPayment, openConfirmDialog, closeConfirmDialog} = this.props;
        var paymentId = selectedPayment.get('paymentId');
        let config = {
            isOpen: true,
            showInput: false,
            message: confirmMessage,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        this.props.changePaymentStatus({paymentId, statusCode});
                        closeConfirmDialog();
                    }
                },
                {label: 'Cancel', onClick: this.props.closeConfirmDialog}
            ]
        };
        openConfirmDialog(config);
    }
    render() {
        let {selectedPayment, paymentBatch, errors, rejectReason, canSubmit, updateErrors, changeConfirmDialogValue} = this.props;
        let self = this;
        let { confirmDialog } = this.props;
        let title = confirmDialog.get('title');
        let buttons = confirmDialog.get('buttons');
        let isOpen = confirmDialog.get('isOpen');
        let showInput = confirmDialog.get('showInput');
        let message = confirmDialog.get('message');
        let paymentStatus = (selectedPayment.get('paymentStatus') || '').toLowerCase();
        let batchStatus = (paymentBatch.get('status') || '').toLowerCase();
        return (
            <div className={style.actionWrap}>
                {
                    <div className={style.actionSeparated}>
                        <Button className='defaultBtn'label='Details'
                          onClick={() => { this.props.togglePopup('paymentDetailsPopup'); }} />
                    </div>
                }
                { self.permissions.canDisable && ['new']
                .indexOf(paymentStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.changePaymentStatus({
                                  statusCode: 'disabled',
                                  confirmMessage: messages.disable
                              });
                          }}
                          label='Disable' />
                    </div>
                ) : null }
                { self.permissions.canVerify && ['new']
                .indexOf(batchStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.props.verifyBatch({
                                  paymentId: self.props.selectedPayment.get('paymentId')
                              });
                          }}
                          label='Check Record' />
                    </div>
                ) : null }
                <ConfirmRejectionDialog
                  title={title}
                  buttons={buttons}
                  isOpen={isOpen}
                  showInput={showInput}
                  message={message}
                  value={rejectReason}
                  errors={errors}
                  canSubmit={canSubmit}
                  changeConfirmDialogValue={changeConfirmDialogValue}
                  updateErrors={updateErrors}
                  />
            </div>
        );
    }
}

PaymentToolBox.propTypes = {
    selectedPayment: PropTypes.object,
    paymentBatch: PropTypes.object,
    batchStatus: PropTypes.object,
    openConfirmDialog: PropTypes.func,
    closeConfirmDialog: PropTypes.func,
    confirmDialog: PropTypes.object,
    deleteBatch: PropTypes.func,
    errors: PropTypes.object,
    rejectReason: PropTypes.string,
    canSubmit: PropTypes.bool,
    updateErrors: PropTypes.func,
    changeConfirmDialogValue: PropTypes.func,
    togglePopup: PropTypes.func.isRequired,
    changePaymentStatus: PropTypes.func
};

PaymentToolBox.contextTypes = {
    checkPermission: PropTypes.func
};

export default connect(
    (state) => {
        return {
            selectedPayment: state.bulkPayment.get('selectedPayment'),
            paymentBatch: state.bulkPayment.get('paymentBatch'),
            batchStatus: state.bulkPayment.get('batchStatus'),
            confirmDialog: state.bulkPayment.get('confirmDialog'),
            errors: state.bulkPayment.get('errors'),
            rejectReason: state.bulkPayment.getIn(['confirmDialog', 'value']),
            canSubmit: state.bulkPayment.getIn(['confirmDialog', 'canSubmit'])
        };
    },
    {
        openConfirmDialog,
        closeConfirmDialog,
        deleteBatch,
        updateErrors,
        changeConfirmDialogValue,
        changePaymentStatus
    }
)(PaymentToolBox);
