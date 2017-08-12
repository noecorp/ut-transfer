import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-customer/ui/react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import DatePicker from 'ut-front-react/components/DatePicker/Simple';
import RadioInput from 'ut-front-react/components/Input/Radio';
import Text from 'ut-front-react/components/Text';

import { editTransferField } from '../../../pages/Transfer/Budget/actions';
import { inputsConfig } from './config';
import { validations } from './validations';
import style from './style.css';

class TransferBudgetCreate extends Component {
//
    constructor(props, context) {
        super(props, context);
        this.onInputChange = this.onInputChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    getDropdownData(key) {
        return this.props.dropdownData.get(key, immutable.List([])).toJS();
    }

    onInputChange(obj) {
        let { key, value } = obj;
        const { editTransferField } = this.props;
        editTransferField({ field: key, value });
    }

    onDropdownChange({ key, value }) {
        const { editTransferField } = this.props;
        editTransferField({ field: key, value });
    }

    onDatePickerChange(field) {
        const { editTransferField } = this.props;
        return ({ value }) => {
            editTransferField({ field, value });
        };
    }

    renderTextInput(input) {
        const { errors } = this.props;
        const value = this.getInputValue(input.key);
        const validationRules = this.getValidationRules(input.key);
        let readonly = input.hasOwnProperty('readonly') ? input.readonly : false;
        return (
            <div className={style.inputWrap}>
                <Input
                  key={input.key}
                  type='text'
                  keyProp={input.key}
                  label={this.translate(input.label)}
                  placeholder={this.translate(input.label)}
                  value={value}
                  isValid={!errors.get(input.key)}
                  errorMessage={errors.get(input.key)}
                  validators={validationRules}
                  readonly={readonly}
                  onChange={this.onInputChange}
                />
            </div>
        );
    }

    renderDropdown(input) {
        const { errors } = this.props;
        const value = this.getInputValue(input.key);
        const dropdownData = input.data || this.getDropdownData(input.key) || [];
        return (
            <div className={style.inputWrap}>
                <Dropdown
                  placeholder={this.translate('Select')}
                  key={input.key}
                  data={dropdownData}
                  keyProp={input.key}
                  isValid={!errors.get(input.key)}
                  errorMessage={errors.get(input.key)}
                  validators={this.getValidationRules(input.key)}
                  defaultSelected={value || input.placeholder}
                  label={this.translate(input.label)}
                  onSelect={this.onDropdownChange}
                />
            </div>
        );
    }

    getValidationRules(key) {
        let validationRules = (validations[key] && validations[key].rules) || [];
        return validationRules;
    }

    getInputValue(key) {
        const { data, edited } = this.props;
        let value = edited.has(key) ? edited.get(key) : data.get(key);
        return value;
    }

    renderHeader() {
        return (
            <div className={style.formHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in diam ultricies, aliquam ligula eget, lobortis mauris. Duis ultricies euismod gravida. Etiam posuere leo sit amet turpis malesuada, eget vehicula nisi semper. Pellentesque quis semper dolor. Integer dolor mauris, volutpat eget consequat vitae, imperdiet in nunc. </div>
        );
    }

    renderMainInfo() {
        const { left, right } = inputsConfig;
        return (
            <TitledContentBox title={this.translate('Sender')}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(left.account)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(left.sourceName)}
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={style.flexLabel}><Text>Personal civil identifier or foreign resident identifier of sender</Text></div>
                            <div className={style.flexInput}>
                                <div style={{flex: 8}}>
                                    {this.renderTextInput(left.civilIdentifier)}
                                </div>
                                <div style={{flex: 1, textAlign: 'center'}}><Text>or</Text></div>
                                <div style={{flex: 8}}>
                                    {this.renderTextInput(left.foreignResidentIdentifier)}
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(left.bulstat)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(left.destinationName)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(left.iban)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(left.bic)}
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(right.paymentType)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(right.amount)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(right.reason)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(right.moreReason)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(right.documentType)}
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={style.flexLabel}>
                                <Text>Number and date of the document, that the payment is based on</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div style={{flex: 15}}>
                                    <DatePicker
                                      defaultValue={this.getInputValue('documentDate')}
                                      disabled={false}
                                      onChange={this.onDatePickerChange('documentDate')} />
                                </div>
                                <div style={{flex: 1}} />
                                <div style={{flex: 15}}>
                                    {this.renderTextInput(right.documentNumber)}
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={style.flexLabel}>
                                <Text>Period covered by the payment</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div style={{flex: 3}}>
                                    <DatePicker
                                      defaultValue={this.getInputValue('startDate')}
                                      disabled={false}
                                      onChange={this.onDatePickerChange('startDate')} />
                                </div>
                                <div style={{flex: 1, textAlign: 'center'}}><Text>to</Text></div>
                                <div style={{flex: 3}}>
                                    <DatePicker
                                      defaultValue={this.getInputValue('endDate')}
                                      disabled={false}
                                      onChange={this.onDatePickerChange('endDate')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={style.flexLabel}>
                                <Text>Payment System</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div className={style.additionalOptionsRadioWrap} style={{ display: 'flex', flexBasis: '100%' }}>
                                    <RadioInput
                                      options={[
                                          { id: 1, label: this.translate('BISERA'), name: 'paymentSystem', value: 'bisera' },
                                          { id: 2, label: this.translate('RINGS'), name: 'paymentSystem', value: 'rings' }
                                      ]} />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    renderAdditionalOptions() {
        return (
            <TitledContentBox title={this.translate('Additional options')}>
                <div className={style.additionalOptionsRadioWrap}>
                <RadioInput
                  options={[
                      { id: 1, label: this.translate('Transfer now'), name: 'transferExecution', value: 'now' },
                      { id: 2, label: this.translate('Transfer at a later pont'), name: 'transferExecution', value: 'future' }
                  ]} />
                </div>
            </TitledContentBox>
        );
    }

    translate(stringToTranslate) {
        return this.context.translate(stringToTranslate);
    }

    render() {
        return (
        <div className={style.wrap}>
            {this.renderHeader()}
            {this.renderMainInfo()}
            {this.renderAdditionalOptions()}
        </div>);
    }
//
}

TransferBudgetCreate.contextTypes = {
    translate: PropTypes.func
};

TransferBudgetCreate.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    // data
    data: PropTypes.object,
    edited: PropTypes.object,
    errors: PropTypes.object,
    dropdownData: PropTypes.object,
    // actions
    editTransferField: PropTypes.func
};

const mapStateToProps = ({ transfersBudget }, ownProps) => {
    const { mode, id } = ownProps;
    return {
        accounts: transfersBudget.getIn(['remote', 'accounts']).toJS(),
        dropdownData: transfersBudget.getIn([mode, id, 'dropdownData']),
        data: transfersBudget.getIn([mode, id, 'data']),
        edited: transfersBudget.getIn([mode, id, 'edited'], immutable.Map()),
        errors: transfersBudget.getIn([mode, id, 'errors'])
    };
};
const mapDispatchToProps = {
    editTransferField
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
