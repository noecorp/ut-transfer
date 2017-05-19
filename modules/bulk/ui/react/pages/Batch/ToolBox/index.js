import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'ut-front-react/components/StandardButton';
import {openConfirmDialog, closeConfirmDialog, changeBatchStatus,
    deleteBatch, updateErrors, changeConfirmDialogValue} from '../actions';
import ConfirmRejectionDialog from 'ut-front-react/components/ConfirmRejectionDialog';
import style from '../../style.css';

const messages = {
    delete: 'Are you sure you want to delete the selected batch?',
    disable: 'Are you sure you want to disable the selected batch?',
    verify: 'Are you sure you want to verify the selected batch?'
};

const actions = {
    disableBatch: 'disableBatch',
    deleteBatch: 'deleteBatch',
    varifyBatch: 'verifyBatch'
};

class BatchToolBox extends Component {
    constructor(props, context) {
        super(props);
        this.changeBatchStatus = this.changeBatchStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changeStatusWithReason = this.changeStatusWithReason.bind(this);
        this.showReasonDialog = this.showReasonDialog.bind(this);
        this.permissions = {
            canDelete: context.checkPermission('bulk.batch.delete'),
            canVerify: context.checkPermission('bulk.batch.verify'),
            canDisable: context.checkPermission('bulk.batch.disable')
        };
    }
    changeBatchStatus({actionName, confirmMessage}) {
        let {selectedBatch, openConfirmDialog, closeConfirmDialog} = this.props;
        var batchId = selectedBatch.get('batchId');
        let config = {
            isOpen: true,
            showInput: false,
            message: confirmMessage,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        this.props.changeBatchStatus({batchId, actionName});
                        closeConfirmDialog();
                    }
                },
                {label: 'Cancel', onClick: this.props.closeConfirmDialog}
            ]
        };
        openConfirmDialog(config);
    }
    handleDelete() {
        let {selectedBatch, openConfirmDialog, closeConfirmDialog} = this.props;
        var batchId = selectedBatch.get('batchId');
        let config = {
            isOpen: true,
            showInput: false,
            message: messages.delete,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        this.props.deleteBatch(batchId);
                        closeConfirmDialog();
                    }
                },
                {label: 'Cancel', onClick: this.props.closeConfirmDialog}
            ]
        };
        openConfirmDialog(config);
    }
    changeStatusWithReason({batchId, actionName}) {
        let {rejectReason, closeConfirmDialog} = this.props;
        this.props.changeBatchStatus({batchId, actionName, reason: rejectReason});
        closeConfirmDialog();
    }
    showReasonDialog({actionName, confirmMessage}) {
        let {selectedBatch, openConfirmDialog, closeConfirmDialog} = this.props;
        var self = this;
        var batchId = selectedBatch.get('batchId');
        let reasonDialogConfig = {
            isOpen: true,
            showInput: true,
            title: 'Enter reject reason',
            message: '',
            buttons: [
                {
                    label: 'Submit',
                    onClick: () => {
                        self.changeStatusWithReason({batchId, actionName});
                    },
                    disabled: !this.props.canSubmit
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
                    label: actionName === actions.deleteBatch ? 'Delete' : actionName === actions.disableBatch ? 'Disable' : '',
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
    render() {
        let {selectedBatch, errors, rejectReason, canSubmit, updateErrors, changeConfirmDialogValue} = this.props;
        let self = this;
        let { confirmDialog } = this.props;
        let title = confirmDialog.get('title');
        let buttons = confirmDialog.get('buttons');
        let isOpen = confirmDialog.get('isOpen');
        let showInput = confirmDialog.get('showInput');
        let message = confirmDialog.get('message');
        let batchStatus = (selectedBatch.get('status') || '').toLowerCase();
        return (
            <div className={style.actionWrap}>
                {
                    <div className={style.actionSeparated}>
                        <Button href={'/bulk/batch/' + this.props.batchTypeName + '/' + selectedBatch.get('batchId')} className='defaultBtn'label='View Batch Records' />
                    </div>
                }
                {
                    <div className={style.actionSeparated}>
                        <Button className='defaultBtn'label='Details'
                          onClick={() => { this.props.togglePopup('batchDetailsPopup'); }} />
                    </div>
                }
                {/* { self.permissions.canDisable && ['new', 'rejected']
                .indexOf(batchStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.showReasonDialog({
                                  actionName: actions.disableBatch,
                                  confirmMessage: messages.disable
                              });
                          }}
                          label='Disable' />
                    </div>
                ) : null } */}
                { self.permissions.canDelete && ['new', 'rejected']
                .indexOf(batchStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.showReasonDialog({
                                  actionName: actions.deleteBatch,
                                  confirmMessage: messages.delete
                              });
                          }}
                          label='Delete' />
                    </div>
                ) : null }
                { self.permissions.canVerify && ['invalid']
                .indexOf(batchStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.handleDelete();
                          }}
                          label='Delete' />
                    </div>
                ) : null }
                { self.permissions.canDelete && ['new']
                .indexOf(batchStatus) !== -1 ? (
                    <div className={style.actionSeparated}>
                        <Button
                          className='defaultBtn'
                          onClick={() => {
                              self.props.verifyBatch({
                                  batchId: self.props.selectedBatch.get('batchId')
                              });
                          }}
                          label='Check Batch' />
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

BatchToolBox.propTypes = {
    selectedBatch: PropTypes.object,
    batchStatuses: PropTypes.array,
    openConfirmDialog: PropTypes.func,
    closeConfirmDialog: PropTypes.func,
    confirmDialog: PropTypes.object,
    deleteBatch: PropTypes.func,
    changeBatchStatus: PropTypes.func,
    errors: PropTypes.object,
    rejectReason: PropTypes.string,
    canSubmit: PropTypes.bool,
    updateErrors: PropTypes.func,
    changeConfirmDialogValue: PropTypes.func,
    togglePopup: PropTypes.func.isRequired,
    batchTypeName: PropTypes.string.isRequired
};

BatchToolBox.contextTypes = {
    checkPermission: PropTypes.func
};

export default connect(
    (state) => {
        return {
            selectedBatch: state.bulkBatch.get('selectedBatch'),
            batchStatuses: state.bulkBatch.get('batchStatuses').toJS(),
            confirmDialog: state.bulkBatch.get('confirmDialog'),
            errors: state.bulkBatch.get('errors'),
            rejectReason: state.bulkBatch.getIn(['confirmDialog', 'value']),
            canSubmit: state.bulkBatch.getIn(['confirmDialog', 'canSubmit'])
        };
    },
    {
        openConfirmDialog,
        closeConfirmDialog,
        changeBatchStatus,
        deleteBatch,
        updateErrors,
        changeConfirmDialogValue
    }
)(BatchToolBox);
