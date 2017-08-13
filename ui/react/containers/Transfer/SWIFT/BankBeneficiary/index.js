import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import classnames from 'classnames';
import style from './../style.css';

import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {swiftValidation, cityValidation, nameValidation, addressValidation} from './validations';

class BankBeneficiary extends Component {
    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['bankBeneficiary', fieldName], data.value, data);
        };
    }
    render() {
        return (
            <TitledContentBox title={<Text>Beneficiary Bank</Text>}>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.swift} label={<Text>SWIFT / BIC</Text>}
                          onChange={this.handleInputChange('swift')}
                          keyProp='swift'
                          boldLabel
                          validators={swiftValidation.rules}
                          isValid={this.props.errors.get('swift') === undefined}
                          errorMessage={this.props.errors.get('swift')}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.city} label={<Text>City</Text>}
                          onChange={this.handleInputChange('city')}
                          keyProp='city'
                          boldLabel
                          validators={cityValidation.rules}
                          isValid={this.props.errors.get('city') === undefined}
                          errorMessage={this.props.errors.get('city')}
                        />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.name} label={<Text>Name</Text>}
                          onChange={this.handleInputChange('name')}
                          keyProp='name'
                          boldLabel
                          validators={nameValidation.rules}
                          isValid={this.props.errors.get('name') === undefined}
                          errorMessage={this.props.errors.get('name')}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Dropdown
                          defaultSelected={this.props.country}
                          label={<span><Text>Country</Text> *</span>}
                          boldLabel
                          keyProp='country'
                          isValid={this.props.errors.get('country') === undefined}
                          errorMessage={this.props.errors.get('country')}
                          onSelect={this.handleInputChange('country')}
                          data={this.props.countries.toJS()}
                          className={style.rowPaddings}
                        />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings)}>
                        <Input value={this.props.address} label={<Text>Address</Text>}
                          onChange={this.handleInputChange('address')}
                          keyProp='address'
                          boldLabel
                          validators={addressValidation.rules}
                          isValid={this.props.errors.get('address') === undefined}
                          errorMessage={this.props.errors.get('address')}
                        />
                    </div>
                </div>
            </TitledContentBox>
        );
    }
}

BankBeneficiary.propTypes = {
    countries: PropTypes.object.isRequired,

    swift: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        countries: state.transferSwift.get('countries'),

        swift: state.transferSwift.getIn(['bankBeneficiary', 'swift']),
        city: state.transferSwift.getIn(['bankBeneficiary', 'city']),
        name: state.transferSwift.getIn(['bankBeneficiary', 'name']),
        country: state.transferSwift.getIn(['bankBeneficiary', 'country']),
        address: state.transferSwift.getIn(['bankBeneficiary', 'address']),

        errors: state.transferSwift.getIn(['errors', 'bankBeneficiary'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(BankBeneficiary);
