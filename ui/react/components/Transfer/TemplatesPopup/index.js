import React, { Component, PropTypes } from 'react';

import Popup from 'ut-front-react/components/Popup';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Text from 'ut-front-react/components/Text';

import style from './style.css';

class TemplatesPopup extends Component {
//
    constructor(props) {
        super(props);
        this.onTemplateSelect = this.onTemplateSelect.bind(this);
    }

    get actionButtons() {
        const onLoad = () => {
            this.props.onLoad(this.state.selected);
        };
        return [
            { label: this.context.translate('Load'), onClick: onLoad, styleType: 'primaryDialog' },
            { label: this.context.translate('Cancel'), onClick: this.props.onCancel, styleType: 'secondaryDialog' }
        ];
    }

    get templates() {
        if (!this.props.templates.length) {
            return this.props.templates;
        }
        return this.props.templates.map((template, index) => ({
            key: index,
            name: template.name
        }));
    }

    onTemplateSelect(selected) {
        let key = selected.value;
        this.setState({
            selected: key
        });
    }

    render() {
        return (
            <Popup
              isOpen={this.props.isOpen}
              header={{text: this.context.translate('Load a template')}}
              footer={{actionButtons: this.actionButtons}}>
                <div className={style.popupWrap}>
                    <div className={style.infoRow}>
                        <Text>Select one of your previously saved templates</Text>
                    </div>
                    <div className={style.row}>
                        <Dropdown
                          placeholder={this.context.translate('Select')}
                          data={this.templates}
                          label={this.context.translate('Templates')}
                          defaultSelected={this.state && this.state.selected}
                          onSelect={this.onTemplateSelect}
                        />
                    </div>
                </div>
            </Popup>
        );
    }
//
}

TemplatesPopup.propTypes = {
    isOpen: PropTypes.bool,
    onLoad: PropTypes.func,
    onCancel: PropTypes.func,
    templates: PropTypes.array
};

TemplatesPopup.contextTypes = {
    translate: PropTypes.func
};

TemplatesPopup.defaultProps = {
    isOpen: false,
    templates: [],
    onLoad: () => {},
    onCancel: () => {}
};

export default TemplatesPopup;

// const mapStateToProps = ({ transfersBudget }, ownProps) => {

// };

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(TemplatesPopup);
