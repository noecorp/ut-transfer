import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from 'ut-front-react/components/Popup';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import { validateAll } from 'ut-front-react/utils/validator';

import { editConfirmTransferPopupField, setConfirmTransferPopupErrors } from '../../../pages/Transfer/Budget/actions';

import style from './style.css';
import { getConfirmTransferPopupValidations, validations } from './validations';
import { prepareErrorsWithFullKeyPath } from '../../../utils';

class ConfirmTransferPopup extends Component {
//
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
    }

    get actionButtons() {
        return [
            { label: this.context.translate('Confirm'), onClick: this.onConfirmClick, styleType: 'primaryDialog' },
            { label: this.context.translate('Cancel'), onClick: this.props.onCancel, styleType: 'secondaryDialog' }
        ];
    }

    onInputChange(data) {
        let { key, value } = data;
        this.props.editConfirmTransferPopupField({ field: key, value, data });
    }

    onConfirmClick() {
        let confirmTransferPopupValidations = getConfirmTransferPopupValidations();
        let validation = validateAll(this.props.data, confirmTransferPopupValidations);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setConfirmTransferPopupErrors(errors);
            return;
        }
        this.props.onConfirm();
    }

    render() {
        const { errors, data } = this.props;
        const password = data.get('password');
        const otp = data.get('otp');
        return (
            <Popup
              isOpen={this.props.isOpen}
              header={{text: this.context.translate('Confirm payment')}}
              footer={{actionButtons: this.actionButtons}} >
                <div className={style.popupWrap}>
                    <div className={style.infoRow}>
                        <Text>Please confirm this transfer with your password and the OTP you have received on your phone.</Text>
                    </div>
                    <div className={style.row}>
                        <Input
                          type='password'
                          keyProp='password'
                          label={this.context.translate('Password')}
                          placeholder={this.context.translate('Password')}
                          value={password}
                          isValid={!errors.get('password')}
                          validators={validations.password.rules}
                          errorMessage={errors.get('password')}
                          onChange={this.onInputChange} />
                    </div>
                    <div className={style.row}>
                        <Input
                          type='text'
                          keyProp='otp'
                          label={this.context.translate('OTP')}
                          placeholder={this.context.translate('OTP')}
                          value={otp}
                          isValid={!errors.get('otp')}
                          validators={validations.otp.rules}
                          errorMessage={errors.get('otp')}
                          onChange={this.onInputChange} />
                    </div>
                </div>
            </Popup>
        );
    }
//
}

ConfirmTransferPopup.propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    isOpen: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    editConfirmTransferPopupField: PropTypes.func,
    setConfirmTransferPopupErrors: PropTypes.func
};

ConfirmTransferPopup.contextTypes = {
    translate: PropTypes.func
};

ConfirmTransferPopup.defaultProps = {
    isOpen: false,
    onConfirm: () => {},
    onCancel: () => {}
};

const mapStateToProps = ({ transfersBudget }, ownProps) => ({
    data: transfersBudget.getIn(['create', 'create', 'confirmTransferPopup', 'data']),
    errors: transfersBudget.getIn(['create', 'create', 'confirmTransferPopup', 'errors'])
});

const mapDispatchToProps = {
    editConfirmTransferPopupField,
    setConfirmTransferPopupErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransferPopup);
