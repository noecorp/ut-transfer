import React, { Component, PropTypes } from 'react';

import Popup from 'ut-front-react/components/Popup';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';

import style from './style.css';

class ConfirmTransferPopup extends Component {
    render() {
        const { password, otp } = this.props.inputs;
        return (
            <Popup
              isOpen={this.props.isOpen}
              header={{text: this.context.translate('Confirm payment')}}
              footer={{actionButtons: this.props.actionButtons}} >
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
                          value={password.value}
                          isValid={password.isValid}
                          errorMessage={!password.isValid && this.context.translate('Invalid password')}
                          onChange={password.onChange} />
                    </div>
                    <div className={style.row}>
                        <Input
                          type='text'
                          keyProp='otp'
                          label={this.context.translate('OTP')}
                          placeholder={this.context.translate('OTP')}
                          value={otp.value}
                          isValid={otp.isValid}
                          errorMessage={!otp.isValid && this.context.translate('Invalid OTP')}
                          onChange={otp.onChange} />
                    </div>
                </div>
            </Popup>
        );
    }
}

ConfirmTransferPopup.propTypes = {
    actionButtons: PropTypes.array,
    isOpen: PropTypes.bool,
    inputs: PropTypes.shape({
        password: PropTypes.shape({
            value: PropTypes.string,
            isValid: PropTypes.bool,
            onChange: PropTypes.func
        }),
        otp: PropTypes.shape({
            value: PropTypes.string,
            isValid: PropTypes.bool,
            onChange: PropTypes.func
        })
    })
};

ConfirmTransferPopup.contextTypes = {
    translate: PropTypes.func
};

ConfirmTransferPopup.defaultProps = {
    isOpen: false,
    inputs: {
        password: {
            value: '',
            isValid: true,
            onChange: () => {}
        },
        otp: {
            value: '',
            isValid: true,
            onChange: () => {}
        }
    }
};

export default ConfirmTransferPopup;
