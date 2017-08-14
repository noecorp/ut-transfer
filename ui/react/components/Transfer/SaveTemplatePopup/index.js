import React, { Component, PropTypes } from 'react';

import Popup from 'ut-front-react/components/Popup';
import Text from 'ut-front-react/components/Text';
import Input from 'ut-front-react/components/Input';
import style from './style.css';

class SaveTemplatePopup extends Component {
//
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.state = {
            templateName: ''
        };
    }

    get actionButtons() {
        const onSave = () => {
            this.props.onSave(this.state.templateName);
        };
        return [
            { label: this.context.translate('Save'), onClick: onSave, styleType: 'primaryDialog' },
            { label: this.context.translate('Cancel'), onClick: this.props.onCancel, styleType: 'secondaryDialog' }
        ];
    }

    onNameChange(data) {
        this.setState({
            templateName: data.value
        });
    }

    render() {
        return (
            <Popup
              isOpen={this.props.isOpen}
              header={{text: this.context.translate('Save as a template')}}
              footer={{actionButtons: this.actionButtons}}>
                <div className={style.popupWrap}>
                    <div className={style.infoRow}>
                        <Text>Select one of your previously saved templates</Text>
                    </div>
                    <div className={style.row}>
                        <Input
                          type='text'
                          label={this.context.translate('Name')}
                          placeholder={this.context.translate('Name')}
                          value={this.state.templateName}
                          onChange={this.onNameChange}
                        />
                    </div>
                </div>
            </Popup>
        )
    }
//
}

SaveTemplatePopup.propTypes = {
    isOpen: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};

SaveTemplatePopup.contextTypes = {
    translate: PropTypes.func
};

SaveTemplatePopup.defaultProps = {
    isOpen: false,
    onSave: () => {},
    onCancel: () => {}
};

export default SaveTemplatePopup;
