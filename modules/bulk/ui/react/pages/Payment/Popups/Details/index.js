import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Input from 'ut-front-react/components/Input';
import style from '../../../style.css';
import {validations} from '../../../helpers';

export class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }
    handleFieldChange(field) {
        this.props.actions.setField(field);
    }
    componentWillMount() {
        this.props.actions.getPayment(this.props.paymentId);
    }
    render() {
        let {paymentDetails, errors} = this.props;
        return (
                <div className={style.uploadForm}>
                    <div className={style.outerStatus}>
                        <span className={style.innerStatusLabel}>Status:</span>
                        <span className={style.innerStatusSign}>{paymentDetails.paymentStatus}</span>
                    </div>
                    <div className={style.row}>
                            <Input value={paymentDetails.info} label='Comment' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
                    </div>
                    <hr />
                    <div className={style.row}>
                        <Input value={paymentDetails.sequenceNumber} readonly label='Sequence Number'
                          keyProp={'paymentDetails,sequenceNumber'}
                          inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.account} readonly={!this.props.canEdit}
                          label='Account'
                          validators={validations.accountValidations}
                          isValid={errors.getIn(['paymentDetails', 'account']) === undefined}
                          keyProp={'paymentDetails,account'}
                          onChange={this.handleFieldChange}
                          inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.customerName}
                          readonly={!this.props.canEdit} label='Customer Name'
                          keyProp={'paymentDetails,customerName'}
                          validators={validations.customerNameValidations}
                          isValid={errors.getIn(['paymentDetails', 'customerName']) === undefined}
                          onChange={this.handleFieldChange}
                          inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.currency} readonly label='Currency'
                          inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.amount} readonly={!this.props.canEdit}
                          label='Amount'
                          keyProp={'paymentDetails,amount'}
                          validators={validations.amountValidations}
                          isValid={errors.getIn(['paymentDetails', 'amount']) === undefined}
                          onChange={this.handleFieldChange} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                </div>
        );
    }
}

PaymentDetails.propTypes = {
    actions: PropTypes.object,
    paymentDetails: PropTypes.object,
    canEdit: PropTypes.bool.isRequired,
    paymentId: PropTypes.string.isRequired,
    errors: PropTypes.object
};

export default connect(
    (state, ownProps) => {
        return {
            paymentDetails: state.bulkPayment.get('paymentDetails').toJS(),
            errors: state.bulkPayment.get('errors')
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        };
    }
)(PaymentDetails);
