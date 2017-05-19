import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Input from 'ut-front-react/components/Input';
import style from '../../../style.css';

export class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }
    handleFieldChange(field) {
        return ({value}) => (
            this.props.actions.setField(field, value)
        );
    }
    componentWillMount() {
        this.props.actions.getPayment(this.props.paymentId);
    }
    render() {
        let {paymentDetails} = this.props;
        return (
                <div className={style.uploadForm}>
                    <div className={style.outerStatus}>
                        <span className={style.innerStatusLabel}>Status:</span>
                        <span className={style.innerStatusSign}>{paymentDetails.paymentStatus}</span>
                    </div>
                    <div className={style.row}>
                            <Input value={paymentDetails.info} label='Comment:' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
                    </div>
                    <hr />
                    <div className={style.row}>
                        <Input value={paymentDetails.sequenceNumber} readonly label='Sequence Number:' onChange={this.handleFieldChange('paymentDetails,sequenceNumber')} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.account} readonly={!this.props.canEdit} label='Account:' onChange={this.handleFieldChange('paymentDetails,account')} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.customerName} readonly={!this.props.canEdit} label='Customer Name:' onChange={this.handleFieldChange('paymentDetails,customerName')} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.currency} readonly label='Currency:' onChange={this.handleFieldChange('paymentDetails,currency')} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                    <div className={style.row}>
                        <Input value={paymentDetails.amount} readonly={!this.props.canEdit} label='Amount:' onChange={this.handleFieldChange('paymentDetails,amount')} inputWrapClassName={style.inputWrapClassName} />
                    </div>
                </div>
        );
    }
}

PaymentDetails.propTypes = {
    actions: PropTypes.object,
    paymentDetails: PropTypes.object,
    canEdit: PropTypes.bool.isRequired,
    paymentId: PropTypes.string.isRequired
};

export default connect(
    (state, ownProps) => {
        return {
            paymentDetails: state.bulkPayment.get('paymentDetails').toJS()
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        };
    }
)(PaymentDetails);
