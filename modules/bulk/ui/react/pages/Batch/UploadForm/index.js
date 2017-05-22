import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Input from 'ut-front-react/components/Input';
import Checkbox from 'ut-front-react/components/Input/Checkbox';
import Popup from 'ut-front-react/components/Popup';
import * as actionCreators from './actions';
import style from '../../style.css';
import FormInput from 'ut-front-react/components/FormInput';
import TextArea from 'ut-front-react/components/Input/TextArea';
import {validations} from '../../helpers';

let UploadForm = React.createClass({
    propTypes: {
        onClose: PropTypes.func,
        actions: PropTypes.object,
        batchType: PropTypes.object,
        batchId: PropTypes.string,
        batchTypeName: PropTypes.string,
        file: PropTypes.object,
        batch: PropTypes.object,
        checkBatch: PropTypes.bool,
        errors: PropTypes.object,
        result: PropTypes.object
    },
    defaultProps: {
        onClose: () => {},
        batchType: {}
    },
    onClose() {
        this.props.actions.clearBatchProfile();
        this.props.onClose();
        if (!this.canUpload()) {
            this.props.actions.fetchBatches();
        }
    },
    onSubmit(e) {
        e.preventDefault();
        var file = this.props.file;
        let {checkBatch, batch} = this.props;
        var data = new window.FormData();
        if (!file) {
            return this.props.actions.changeField({
                key: 'result',
                value: new Error('Please load the batch file')
            });
        }
        if (!batch.name) {
            return this.props.actions.changeField({
                key: 'result',
                value: new Error('Please enter the batch name')
            });
        }
        batch.batchTypeId = this.props.batchType.key;
        if (this.props.batchId) {
            batch.batchId = this.props.batchId;
        }
        if (checkBatch) {
            data.append('checkBatch', checkBatch);
        }
        data.append('file', file);
        for (var key in batch) {
            data.append(key, batch[key]);
        }
        data.processData = false;
        data.contentType = false;
        var xhr = new window.XMLHttpRequest();
        xhr.open(this.props.batchId ? 'PUT' : 'POST', '/rpc/batch', true);
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.onload = (e) => {
            this.props.actions.hidePreload();
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.response);
                this.props.actions.changeField({
                    key: 'result',
                    value: {message: 'Successfully uploaded ' + response.insertedRows + ' entities'}
                });
            } else {
                this.props.actions.changeField({
                    key: 'result',
                    value: new Error(xhr.response)});
            }
        };
        xhr.send(data);
        this.props.actions.showPreload();
    },
    getActionButtons() {
        let buttons = [];
        let {errors, file} = this.props;
        // var errors = this.props.errors;
        // var file = this.refs.fileInput && this.refs.fileInput.refs.inputNode.files[0];
        if (!this.canUpload()) {
            buttons.push({
                label: 'Close',
                onClick: this.onClose,
                className: ['defaultBtn']
            });
        } else {
            buttons.push({
                label: 'Upload',
                type: 'submit',
                disabled: errors.size > 0 || !file,
                onClick: this.onSubmit,
                className: ['defaultBtn']
            }, {
                label: 'Cancel',
                onClick: this.onClose,
                className: ['defaultBtn']
            });
        }
        return buttons;
    },
    canUpload() {
        return !this.props.result.message || this.props.result.value instanceof Error;
    },
    handleChange(params) {
        this.props.actions.changeField(params);
    },
    onClick() {
        this.refs.fileInput.refs.inputNode.click();
    },
    onFileChange() {
        this.handleChange({
            key: 'file',
            value: this.refs.fileInput.refs.inputNode.files[0]
        });
        this.handleChange({
            key: 'batch,originalFilename',
            value: this.refs.fileInput.refs.inputNode.files[0].name
        });
    },
    onCheckboxChange() {
        this.handleChange({
            key: 'checkBatch',
            value: !this.props.checkBatch
        });
    },
    getFormBody() {
        let { errors } = this.props;
        let {name, description, originalFilename} = this.props.batch;
        if (this.canUpload()) {
            return (
                <div className={style.fileInput}>
                    <div className={style.inputOuterWrapper}>
                        <Input value={name} type='text'
                          keyProp={'batch,name'} name='name'
                          validators={validations.batchNameValidations}
                          isValid={errors.get('name') === undefined}
                          errorMessage={errors.get('name')}
                          label='Batch Name' onChange={this.handleChange} />
                    </div>
                    <div className={style.infoInputWrapper}>
                        <Input value={originalFilename} readonly label='Upload Batch' inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.buttonsWrapper}>
                        <div className={style.buttonsInnerWrapper}>
                            <label htmlFor='fileInput' className={style.browseBtn} onClick={this.onClick} >Browse...</label>
                            <FormInput ref='fileInput' type='file' keyProp={'originalFilename'} acceptType='text/csv' onChange={this.onFileChange} />
                        </div>
                    </div>
                    <div className={style.inputOuterWrapper}>
                        <TextArea label='Description' name='comment' value={description} keyProp={'batch,description'}
                          onChange={this.handleChange} />
                    </div>
                    <div className={style.inputOuterWrapper}>
                        <Checkbox label='Check batch after upload' checked={this.props.checkBatch} onClick={this.onCheckboxChange} />
                    </div>
                </div>
            );
        }
        return null;
    },
    getMessage() {
        let result = this.props.result;
        if (result.message) {
            return (
              <div className={result instanceof Error ? style.errorMessage : style.successMessage}>{result.message}</div>
            );
        }
        return null;
    },
    render() {
        return (
            <Popup
              hasOverlay
              isOpen
              closeOnOverlayClick
              header={{
                  text: 'Upload Batch Payment',
                  closePopup: this.onClose
              }}
              footer={{
                  className: style.footer,
                  actionButtons: this.getActionButtons()
              }}
              closePopup={this.onClose}
            >
                <div className={style.uploadForm}>
                    {this.getFormBody()}
                    {this.getMessage()}
                </div>
            </Popup>
        );
    }
});

function getBatchType(batchTypeName, batchTypes) {
    var batchKey = batchTypeName === 'debit' ? 'bulkDebitInternal'
        : batchTypeName === 'credit' ? 'bulkCreditInternal' : batchTypeName === 'merchants' ? 'bulkCreditMerchant' : '';
    return batchTypes.find(function(bt) {
        return bt.code === batchKey;
    });
}

export default connect(
    (state, ownProps) => {
        return {
            batchTypeName: ownProps.batchTypeName,
            checkBatch: state.bulkBatchUpload.get('checkBatch'),
            result: state.bulkBatchUpload.get('result'),
            batchType: getBatchType(ownProps.batchTypeName, state.bulkBatch.get('batchTypes').toJS() || []) || {},
            errors: state.bulkBatchUpload.get('errors'),
            file: state.bulkBatchUpload.get('file'),
            batch: state.bulkBatchUpload.get('batch').toJS()
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actionCreators, dispatch)
        };
    }
)(UploadForm);
