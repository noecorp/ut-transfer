import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import classnames from 'classnames';

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
import { amlDeclaration } from '../../../pages/Transfer/commonStaticData';

class TransferBudget extends Component {
    constructor(props, context) {
        super(props, context);
        this.onInputChange = this.onInputChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    getDropdownData(key) {
        return this.props.dropdownData.get(key, immutable.List([])).toJS();
    }

    onInputChange(data) {
        let { key, value } = data;
        const { editTransferField } = this.props;
        editTransferField({ field: key, value, data: data });
    }

    onDropdownChange(data) {
        let { key, value } = data;
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
        const { errors, inputsAreReadonly } = this.props;
        const value = this.getInputValue(input.key);
        const validationRules = this.getValidationRules(input.key);
        let readonly = inputsAreReadonly || (input.hasOwnProperty('readonly') ? input.readonly : false);
        return (
            <div className={style.inputWrap}>
                <Input
                  key={input.key}
                  boldLabel
                  type='text'
                  keyProp={input.key}
                  label={input.label && <Text>{input.label}</Text>}
                  placeholder={this.translate(input.label)}
                  value={value}
                  isValid={!errors.get(input.key)}
                  errorMessage={errors.get(input.key)}
                  validators={validationRules}
                  readonly={readonly}
                  inputWrapClassName={readonly && style.readOnlyInput}
                  onChange={this.onInputChange}
                />
            </div>
        );
    }

    renderDropdown(input) {
        const { errors, inputsAreReadonly } = this.props;
        const value = this.getInputValue(input.key);
        const dropdownData = input.data || this.getDropdownData(input.key) || [];
        return (
            <div className={style.inputWrap}>
                <Dropdown
                  boldLabel
                  disabled={inputsAreReadonly}
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

    renderDatePicker(input) {
        const { errors, inputsAreReadonly } = this.props;
        const errorMessage = errors.get(input.key);
        return (
            <div className={style.datepickerWrap}>
                <div>
                    <DatePicker
                      disabled={inputsAreReadonly}
                      isValid={!errors.get(input.key)}
                      defaultValue={this.getInputValue(input.key)}
                      onChange={this.onDatePickerChange(input.key)} />
                </div>
                {errorMessage &&
                <div className={style.datepickerError}>{errorMessage}</div>}
            </div>
        );
    }

    getValidationRules(key) {
        let validationRules = (validations[key] && validations[key].rules) || [];
        return validationRules;
    }

    getInputValue(key) {
        const { data, edited } = this.props;
        let value;
        if (Array.isArray(key)) {
            value = edited.hasIn(key) ? edited.getIn(key) : data.getIn(key);
        } else {
            value = edited.has(key) ? edited.get(key) : data.get(key);
        }
        return value;
    }

    renderLiableEntityInfo() {
        const { inputsAreReadonly } = this.props;
        let liableEntityType = this.getInputValue('liableEntityType');
        return (
            <div className={style.inputWrapFlex}>
                <div className={classnames(style.flexLabel, style.bold)}>
                    <Text>Liable Entity Information</Text>
                </div>
                <div className={style.flexInput}>
                    <div style={{flex: 15}}>
                        <Input
                          key='key'
                          type='text'
                          value={this.getInputValue(['liableEntityInfo', 'personalIdentifier'])}
                          keyProp={['liableEntityInfo', 'personalIdentifier']}
                          readonly={inputsAreReadonly || liableEntityType !== 'person'}
                          placeholder={this.translate('Personal Identifier')}
                          onChange={this.onInputChange}
                        />
                    </div>
                    <div style={{flex: 1}} />
                    <div style={{flex: 15}}>
                        <Input
                          key='key'
                          type='text'
                          value={this.getInputValue(['liableEntityInfo', 'bulstat'])}
                          keyProp={['liableEntityInfo', 'bulstat']}
                          readonly={inputsAreReadonly || liableEntityType !== 'legalEntity'}
                          placeholder={this.translate('Bultstat')}
                          onChange={this.onInputChange}
                        />
                    </div>
                    <div style={{flex: 1}}></div>
                    <div style={{flex: 15}}>
                        <Input
                          key='key'
                          type='text'
                          value={this.getInputValue(['liableEntityInfo', 'foreignResidentIdentifier'])}
                          keyProp={['liableEntityInfo', 'foreignResidentIdentifier']}
                          readonly={inputsAreReadonly || liableEntityType !== 'foreignResident'}
                          placeholder={this.translate('Foreign Resident Identifier')}
                          onChange={this.onInputChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // TODO Separate these renders into different containers/components (as with Swift Transfers)!

    renderSenderInfo() {
        const { inputsAreReadonly } = this.props;
        return (
            <TitledContentBox title={this.translate('Sender')}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(inputsConfig.account)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.sourceName)}
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Personal civil identifier or foreign resident identifier of sender</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div style={{flex: 8}}>
                                    {this.renderTextInput(inputsConfig.civilIdentifier)}
                                </div>
                                <div style={{flex: 2}} className={style.middleLabels}><Text>or</Text></div>
                                <div style={{flex: 8}}>
                                    {this.renderTextInput(inputsConfig.foreignResidentIdentifier)}
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.sourceIban)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.sourceBank)}
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.bulstat)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.liableEntityName)}
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Liable Entity Type</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div className={style.additionalOptionsRadioWrap} style={{ display: 'flex', flexBasis: '100%' }}>
                                <RadioInput
                                  disabled={inputsAreReadonly}
                                  defaultValue={this.getInputValue('liableEntityType')}
                                  onChange={this.onInputChange}
                                  options={[
                                      { id: 1, label: this.translate('Person'), name: 'liableEntityType', value: 'person' },
                                      { id: 2, label: this.translate('Legal Entity'), name: 'liableEntityType', value: 'legalEntity' },
                                      { id: 3, label: this.translate('Foreign resident'), name: 'liableEntityType', value: 'foreignResident' }
                                  ]} />
                                </div>
                            </div>
                        </div>
                        {this.renderLiableEntityInfo()}
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    renderBeneficiaryInfo() {
        return (
            <TitledContentBox title={this.translate('Beneficiary')}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                         <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.iban)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.bic)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.bank)}
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.destinationName)}
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    renderTransferInfo() {
        const { errors, inputsAreReadonly } = this.props;
        return (
            <TitledContentBox title={this.translate('Transfer Info')}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(inputsConfig.paymentType)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.amount)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.reason)}
                        </div>
                        <div className={style.inputWrap}>
                            {this.renderTextInput(inputsConfig.moreReason)}
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrap}>
                            {this.renderDropdown(inputsConfig.documentType)}
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Number and date of the document, that the payment is based on</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div style={{flex: 15}}>
                                    {this.renderDatePicker({ key: 'documentDate' })}
                                </div>
                                <div style={{flex: 1}} />
                                <div style={{flex: 15}}>
                                    {this.renderTextInput(inputsConfig.documentNumber, false)}
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Period covered by the payment</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div style={{flex: 4}}>
                                    {this.renderDatePicker({ key: 'startDate' })}
                                </div>
                                <div style={{flex: 1}} className={style.middleLabels}><Text>to</Text></div>
                                <div style={{flex: 4}}>
                                    {this.renderDatePicker({ key: 'endDate' })}
                                </div>
                            </div>
                        </div>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Payment System</Text> *
                            </div>
                            <div className={style.flexInput}>
                                <div className={style.additionalOptionsRadioWrap} style={{ display: 'flex', flexBasis: '100%' }}>
                                    <RadioInput
                                      disabled={inputsAreReadonly}
                                      defaultValue={this.getInputValue('paymentSystem')}
                                      onChange={this.onInputChange}
                                      options={[
                                          { id: 1, label: this.translate('BISERA'), name: 'paymentSystem', value: 'bisera' },
                                          { id: 2, label: this.translate('RINGS'), name: 'paymentSystem', value: 'rings' }
                                      ]} />
                                    {errors.get('paymentSystem') &&
                                    <div style={{ flexBasis: '50%', fontSize: '12px', color: 'red', textAlign: 'right' }}>
                                        {errors.get('paymentSystem')}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    renderAMLDeclaration() {
        const { inputsAreReadonly } = this.props;
        return (
            <TitledContentBox title={<span className={style.bold}><Text>Declaration under art.4, para.7 and art.6, para.5, item.3 of the Law on Measures against Money Laundering</Text></span>}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            <Dropdown
                              defaultSelected={this.getInputValue('fundsOrigin')}
                              label={<Text>Funds Origin</Text>}
                              placeholder={this.translate('Select')}
                              boldLabel
                              disabled={inputsAreReadonly}
                              keyProp='fundsOrigin'
                              isValid={this.props.errors.get('fundsOrigin') === undefined}
                              errorMessage={this.props.errors.get('fundsOrigin')}
                              onSelect={this.onDropdownChange}
                              data={amlDeclaration}
                              className={style.rowPaddings}
                            />
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    renderAdditionalOptions() {
        const { inputsAreReadonly } = this.props;
        return (
            <TitledContentBox title={this.translate('Additional Options')}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                         <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Execution Date</Text>
                            </div>
                            <div className={style.flexInput}>
                                <div className={style.additionalOptionsRadioWrap} style={{ display: 'flex', flexBasis: '100%' }}>
                                    <RadioInput
                                      disabled={inputsAreReadonly}
                                      defaultValue={this.getInputValue('transferExecution')}
                                      onChange={this.onInputChange}
                                      options={[
                                          { id: 1, label: this.translate('Transfer now'), name: 'transferExecution', value: 'now' },
                                          { id: 2, label: this.translate('Transfer at a later point'), name: 'transferExecution', value: 'future' }
                                      ]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrapFlex}>
                            <div className={classnames(style.flexLabel, style.bold)}>
                                <Text>Execution Date</Text>
                            </div>
                            <div className={style.flexInput}>
                                {this.renderDatePicker({ key: 'transferExecutionDate' })}
                            </div>
                        </div>
                    </div>
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
            {this.renderSenderInfo()}
            {this.renderBeneficiaryInfo()}
            {this.renderTransferInfo()}
            {this.renderAdditionalOptions()}
            {this.renderAMLDeclaration()}
        </div>);
    }
}

TransferBudget.contextTypes = {
    translate: PropTypes.func
};

TransferBudget.propTypes = {
    // inline props
    inputsAreReadonly: PropTypes.bool,
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

TransferBudget.defaultProps = {
    inputsAreReadonly: false
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
)(TransferBudget);
