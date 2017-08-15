import React, { Component, PropTypes } from 'react';

import Popup from 'ut-front-react/components/Popup';
import Text from 'ut-front-react/components/Text';
import Icon from 'ut-front-react/components/Icon';
import style from './style.css';

class TransferSuccessPopup extends Component {
//
    get actionButtons() {
        const onOk = () => {
            this.props.onOk();
        };
        return [
            { label: this.context.translate('OK'), onClick: onOk, styleType: 'primaryDialog' }
        ];
    }

    render() {
        return (
            <Popup
              isOpen={this.props.isOpen}
              header={{text: this.context.translate('Success')}}
              footer={{actionButtons: this.actionButtons}}>
                <div className={style.popupWrap}>
                    <div className={style.iconRow}>
                        <Icon icon='success' />
                    </div>
                    <div className={style.infoRow}>
                        <Text>Transfer executed successfully</Text>
                    </div>
                </div>
            </Popup>
        );
    }
//
}

TransferSuccessPopup.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func
};

TransferSuccessPopup.contextTypes = {
    translate: PropTypes.func
};

TransferSuccessPopup.defaultProps = {
    isOpen: false,
    onOk: () => {}
};

export default TransferSuccessPopup;
