import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Input from 'ut-front-react/components/Input';
import style from '../../../style.css';
import {validations} from '../../../helpers';

export class BatchDetailPopup extends Component {
    constructor(props, state) {
        super(props, state);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(record) {
        this.props.actions.setField(record);
    }
    componentWillMount() {
        this.props.actions.getBatch(this.props.batchId);
    }
    render() {
        let {batchDetails, errors} = this.props;
        return (
            <div className={style.uploadForm}>
                <div className={style.outerStatus}>
                    <span className={style.innerStatusLabel}>Status</span>
                    <span className={style.innerStatusSign}>{batchDetails.status}</span>
                </div>
                <div className={style.row}>
                        <Input value={batchDetails.reason} label='Comment' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
                </div>
                <hr />
                <div className={style.row}>
                        <Input value={batchDetails.name} label='* Batch Name'
                          keyProp={'batchDetails,name'}
                          validators={validations.batchNameValidations}
                          isValid={errors.getIn(['batchDetails', 'name']) === undefined}
                          errorMessage={errors.getIn(['batchDetails', 'name'])}
                          readonly={!this.props.canEdit} inputWrapClassName={style.inputWrapClassName}
                          onChange={this.handleChange} />
                </div>
                <div className={style.row}>
                        <Input keyProp={'batchDetails,description'} value={batchDetails.description} label='Description' readonly={!this.props.canEdit} inputWrapClassName={style.inputWrapClassName}
                          onChange={this.handleChange} />
                </div>
                <div className={style.row}>
                    <Input value={batchDetails.paymentsCount} label='Number of records' readonly inputWrapClassName={style.inputWrapClassName} />
                </div>
                <div className={style.row}>
                    <Input value={batchDetails.totalAmount} label='Total Amount' readonly inputWrapClassName={style.inputWrapClassName} />
                </div>
                <div className={style.row}>
                    <Input value={new Date(batchDetails.updatedOn).toLocaleString()} label='Updated On' readonly inputWrapClassName={style.inputWrapClassName} />
                </div>
            </div>
        );
    }
}

BatchDetailPopup.propTypes = {
    actions: PropTypes.object,
    batchDetails: PropTypes.object,
    batchId: PropTypes.string,
    canEdit: PropTypes.bool,
    errors: PropTypes.object
};

export default connect(
    (state, ownProps) => {
        return {
            batchDetails: state.bulkBatch.get('batchDetails').toJS(),
            batchId: state.bulkBatch.getIn(['selectedBatch', 'batchId']),
            errors: state.bulkBatch.get('errors')
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        };
    }
)(BatchDetailPopup);
