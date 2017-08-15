import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';

import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {reasonValidation, otherBankCostsValidation, commentsValidation} from './validations';

class Transfer extends Component {
    translate(stringToTranslate) {
        return this.context.translate(stringToTranslate);
    }

    getInputValue(key) {
        const { data, edited } = this.props;
        let value = edited.has(key) ? edited.get(key) : data.get(key);
        return value;
    }

    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['transfer', fieldName], data.value, data);
        };
    }

    renderLeftColumn() {
        return (
             <div className={style.formRight}>
                <div className={style.inputWrap}>
                    <Dropdown
                      defaultSelected={this.getInputValue('priority')}
                      label={<span><Text>Priority Of Transfer</Text> *</span>}
                      placeholder={this.translate('Select')}
                      boldLabel
                      keyProp='priority'
                      isValid={this.props.errors.get('priority') === undefined}
                      errorMessage={this.props.errors.get('priority')}
                      onSelect={this.handleInputChange('priority')}
                      data={[
                          {
                              key: 'standard',
                              name: 'Standard'
                          },
                          {
                              key: 'urgent',
                              name: 'Urgent'
                          }
                      ]}
                    />
                </div>
            </div>
        );
    }

    renderRightColumn() {
        return (
            <div className={style.formRight}>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('reason')} label={<Text>Transfer Reason</Text>}
                      onChange={this.handleInputChange('reason')}
                      keyProp='reason'
                      boldLabel
                      validators={reasonValidation.rules}
                      isValid={this.props.errors.get('reason') === undefined}
                      errorMessage={this.props.errors.get('reason')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('comments')} label={<Text>More Info</Text>}
                      onChange={this.handleInputChange('comments')}
                      keyProp='comments'
                      boldLabel
                      validators={commentsValidation.rules}
                      isValid={this.props.errors.get('comments') === undefined}
                      errorMessage={this.props.errors.get('comments')}
                    />
                </div>
            </div>
        );
    }
    render() {
        return (
            <TitledContentBox title={<Text>Transfer</Text>}>
                <div className={style.formWrap}>
                    {this.renderLeftColumn()}
                    {this.renderRightColumn()}
                </div>
            </TitledContentBox>
        );
    }
}

Transfer.contextTypes = {
    translate: PropTypes.func
};

Transfer.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.object,
    edited: PropTypes.object,
    priorities: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { mode, id } = ownProps;
    return {
        data: state.transferSwift.getIn([mode, id, 'data', 'transfer']),
        edited: state.transferSwift.getIn([mode, id, 'edited', 'transfer'], immutable.Map()),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'transfer'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Transfer);
