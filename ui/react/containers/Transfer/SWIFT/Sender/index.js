import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';
import classnames from 'classnames';

import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {
    phoneValidation,
    nameValidation,
    ibanOrdererValidation,
    addressValidation,
    cityValidation,
    currencyValidation,
    sumValidation
} from './validations';

class Sender extends Component {
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
            this.props.changeField(['sender', fieldName], data.value, data);
        };
    }

    renderLeftColumn() {
        return (
            <div className={style.formLeft}>
                <div className={style.inputWrap}>
                    <Dropdown
                      defaultSelected={this.getInputValue('sourceAccount')}
                      label={<span><Text>Source Account</Text> *</span>}
                      placeholder={this.translate('Select')}
                      boldLabel
                      keyProp='sourceAccount'
                      isValid={this.props.errors.get('sourceAccount') === undefined}
                      errorMessage={this.props.errors.get('sourceAccount')}
                      onSelect={this.handleInputChange('sourceAccount')}
                      data={this.props.accounts}
                      className={style.rowPaddings}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('name')} label={<Text>Name</Text>}
                      onChange={this.handleInputChange('name')}
                      keyProp='name'
                      boldLabel
                      readonly
                      validators={nameValidation.rules}
                      isValid={this.props.errors.get('name') === undefined}
                      errorMessage={this.props.errors.get('name')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('address')} label={<Text>Address</Text>}
                      onChange={this.handleInputChange('address')}
                      keyProp='address'
                      boldLabel
                      validators={addressValidation.rules}
                      isValid={this.props.errors.get('address') === undefined}
                      errorMessage={this.props.errors.get('address')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('city')} label={<Text>City</Text>}
                      onChange={this.handleInputChange('city')}
                      keyProp='city'
                      boldLabel
                      validators={cityValidation.rules}
                      isValid={this.props.errors.get('city') === undefined}
                      errorMessage={this.props.errors.get('city')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Dropdown
                      defaultSelected={this.getInputValue('country')}
                      label={<span><Text>Country</Text> *</span>}
                      placeholder={this.translate('Select')}
                      boldLabel
                      keyProp='country'
                      isValid={this.props.errors.get('country') === undefined}
                      errorMessage={this.props.errors.get('country')}
                      onSelect={this.handleInputChange('country')}
                      data={this.props.countries}
                      className={style.rowPaddings}
                    />
                </div>
            </div>
        );
    }

    renderRightColumn() {
        return (
            <div className={style.formRight}>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('phone')} label={<Text>Phone</Text>}
                      onChange={this.handleInputChange('phone')}
                      keyProp='phone'
                      boldLabel
                      readonly
                      validators={phoneValidation.rules}
                      isValid={this.props.errors.get('phone') === undefined}
                      errorMessage={this.props.errors.get('phone')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('iban')} label={<Text>Sender IBAN</Text>}
                      onChange={this.handleInputChange('iban')}
                      keyProp='ibanOrderer'
                      boldLabel
                      readonly
                      validators={ibanOrdererValidation.rules}
                      isValid={this.props.errors.get('iban') === undefined}
                      errorMessage={this.props.errors.get('iban')}
                    />
                </div>
                <div className={classnames(style.inputWrap)}>
                    <div style={{display: 'flex'}}>
                        <div className={style.amountCurrencyLabel}><Text>Amount / Currency</Text></div>
                        <div className={style.amountCurrencyFieldWrapper} >
                            <div className={style.flexColumn}>
                                <Input value={this.getInputValue('sum')}
                                  onChange={this.handleInputChange('sum')}
                                  keyProp='sum'
                                  boldLabel
                                  validators={sumValidation.rules}
                                  isValid={this.props.errors.get('sum') === undefined}
                                />
                                {this.props.errors.get('sum') && <div className={style.errorMessage}>{this.props.errors.get('sum')}</div>}
                            </div>
                            <div className={style.flexColumn}>
                                <Dropdown
                                  defaultSelected={this.getInputValue('currency')}
                                  placeholder={this.translate('Select')}
                                  boldLabel
                                  keyProp='currency'
                                  isValid={this.props.errors.get('currency') === undefined}
                                  onSelect={this.handleInputChange('currency')}
                                  data={this.props.currencies}
                                  className={style.rowPaddings}
                                />
                                {this.props.errors.get('currency') && <div className={style.errorMessage}>{this.props.errors.get('currency')}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.inputWrap}>
                    <Dropdown
                      defaultSelected={this.getInputValue('transferDestination')}
                      label={<span><Text>Transfer Direction</Text> *</span>}
                      placeholder={this.translate('Select')}
                      boldLabel
                      keyProp='transferDestination'
                      isValid={this.props.errors.get('transferDestination') === undefined}
                      errorMessage={this.props.errors.get('transferDestination')}
                      onSelect={this.handleInputChange('transferDestination')}
                      data={[
                          {
                              key: 'abroad',
                              name: 'Abroad'
                          },
                          {
                              key: 'domesticLocal',
                              name: 'Domestic for local party'
                          },
                          {
                              key: 'domestivForeign',
                              name: 'Domestic for foreign party'
                          }
                      ]}
                      className={style.rowPaddings}
                    />
                </div>
            </div>
        );
    }
    render() {
        return (
            <TitledContentBox title={<Text>Sender</Text>}>
                <div className={style.formWrap}>
                    {this.renderLeftColumn()}
                    {this.renderRightColumn()}
                </div>
            </TitledContentBox>
        );
    }
}

Sender.contextTypes = {
    translate: PropTypes.func
};

Sender.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
    })),
    mode: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.object,
    edited: PropTypes.object,
    sourceAccounts: PropTypes.object.isRequired,
    transferDestinations: PropTypes.object.isRequired,
    countries: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
    })),
    changeField: PropTypes.func.isRequired
};

Sender.defaultProps = {
    currencies: [],
    accounts: []
};

function mapStateToProps(state, ownProps) {
    const { mode, id } = ownProps;
    return {
        accounts: state.transferSwift.getIn(['create', 'create', 'dropdownData', 'account']).toJS(),
        data: state.transferSwift.getIn([mode, id, 'data', 'sender']),
        edited: state.transferSwift.getIn([mode, id, 'edited', 'sender'], immutable.Map()),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'sender'], immutable.Map()),
        countries: state.transferSwift.getIn([mode, id, 'nomenclatures', 'country'], immutable.List()).toJS(),
        currencies: state.transferSwift.getIn([mode, id, 'nomenclatures', 'currency'], immutable.List()).toJS()
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Sender);
