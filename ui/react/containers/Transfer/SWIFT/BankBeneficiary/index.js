import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';

import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {swiftValidation, cityValidation, nameValidation, addressValidation} from './validations';

class BankBeneficiary extends Component {
//
    getInputValue(key) {
        const { data, edited } = this.props;
        let value = edited.has(key) ? edited.get(key) : data.get(key);
        return value;
    }

    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['bankBeneficiary', fieldName], data.value, data);
        };
    }

    renderLeftColumn() {
        return (
            <div className={style.formLeft}>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('swift')} label={<Text>SWIFT / BIC</Text>}
                      onChange={this.handleInputChange('swift')}
                      keyProp='swift'
                      boldLabel
                      validators={swiftValidation.rules}
                      isValid={this.props.errors.get('swift') === undefined}
                      errorMessage={this.props.errors.get('swift')}
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('name')} label={<Text>Name</Text>}
                      onChange={this.handleInputChange('name')}
                      keyProp='name'
                      boldLabel
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
            </div>
        );
    }

    renderRightColumn() {
        return (
            <div className={style.formRight}>
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
                      boldLabel
                      keyProp='country'
                      disabled={!this.props.isCountryDisabled}
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

    render() {
        return (
            <TitledContentBox title={<Text>Beneficiary Bank</Text>}>
                <div className={style.formWrap}>
                    {this.renderLeftColumn()}
                    {this.renderRightColumn()}
                </div>
            </TitledContentBox>
        );
    }
}

BankBeneficiary.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    data: PropTypes.object,
    edited: PropTypes.object,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { mode, id } = ownProps;
    return {
        data: state.transferSwift.getIn([mode, id, 'data', 'bankBeneficiary']),
        isCountryDisabled: state.transferSwift.getIn([mode, id, 'data', 'sender', 'transferDestination']) === 'abroad',
        edited: state.transferSwift.getIn([mode, id, 'edited', 'bankBeneficiary'], immutable.Map()),
        countries: state.transferSwift.getIn([mode, id, 'nomenclatures', 'country']).toJS(),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'bankBeneficiary'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(BankBeneficiary);
