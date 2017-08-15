import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';
import {countriesToShowRoutingNumber} from './helpers';
import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {addressValidation, accountNumberValidation, cityValidation} from './validations';

class Beneficiary extends Component {
    translate(stringToTranslate) {
        return this.context.translate(stringToTranslate);
    }

    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['beneficiary', fieldName], data.value, data);
        };
    }

    getInputValue(key) {
        const { data, edited } = this.props;
        let value = edited.has(key) ? edited.get(key) : data.get(key);
        return value;
    }

    renderLeftColumn() {
        return (
            <div className={style.formLeft}>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('recipient')}
                      label={<span><Text>Receiver Name</Text></span>}
                      onChange={this.handleInputChange('recipient')}
                      keyProp='recipient'
                      boldLabel
                      validators={addressValidation.rules}
                      isValid={this.props.errors.get('recipient') === undefined}
                      errorMessage={this.props.errors.get('recipient')}
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
            </div>
        );
    }

    renderRightColumn() {
        return (
            <div className={style.formRight}>
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
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('accountNumber')} label={<Text>Account Number / IBAN</Text>}
                      onChange={this.handleInputChange('accountNumber')}
                      keyProp='accountNumber'
                      boldLabel
                      validators={accountNumberValidation.rules}
                      isValid={this.props.errors.get('accountNumber') === undefined}
                      errorMessage={this.props.errors.get('accountNumber')}
                    />
                </div>
                {this.props.showRoutingNumber && <div className={style.inputWrap}>
                    <Input value={this.getInputValue('routingNumber')} label={<Text>Routing Number</Text>}
                      onChange={this.handleInputChange('routingNumber')}
                      keyProp='routingNumber'
                      boldLabel
                      isValid={this.props.errors.get('routingNumber') === undefined}
                      errorMessage={this.props.errors.get('routingNumber')}
                    />
                </div>}
            </div>
        );
    }
    render() {
        return (
            <TitledContentBox title={<Text>Beneficiary</Text>}>
                <div className={style.formWrap}>
                    {this.renderLeftColumn()}
                    {this.renderRightColumn()}
                </div>
            </TitledContentBox>
        );
    }
}

Beneficiary.contextTypes = {
    translate: PropTypes.func
};

Beneficiary.propTypes = {
    showRoutingNumber: PropTypes.bool,
    mode: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.object,
    edited: PropTypes.object,

    recipients: PropTypes.object.isRequired,
    countries: PropTypes.object.isRequired,

    errors: PropTypes.object.isRequired,
    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { mode, id } = ownProps;
    let data = state.transferSwift.getIn([mode, id, 'data', 'beneficiary']);
    let edited = state.transferSwift.getIn([mode, id, 'edited', 'beneficiary'], immutable.Map());
    let countryKey = 'country';
    return {
        data,
        edited,
        countries: state.transferSwift.getIn([mode, id, 'nomenclatures', 'country']).toJS(),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'beneficiary'], immutable.Map()),
        showRoutingNumber: !!countriesToShowRoutingNumber[edited.has(countryKey) ? edited.get(countryKey) : data.get(countryKey)]
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Beneficiary);