import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import classnames from 'classnames';
import style from './../style.css';

import {changeField} from './../actions';
import {addressValidation, accountNumberValidation, cityValidation} from './validations';

class Beneficiary extends Component {
    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['beneficiary', fieldName], data.value, data);
        };
    }
    render() {
        return (
            <TitledContentBox title={<Text>Beneficiary</Text>}>
                 <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Dropdown
                          defaultSelected={this.props.recipient}
                          label={<span><Text>Receiver Name</Text> *</span>}
                          boldLabel
                          keyProp='recipient'
                          isValid={this.props.errors.get('recipient') === undefined}
                          errorMessage={this.props.errors.get('recipient')}
                          onSelect={this.handleInputChange('recipient')}
                          data={this.props.recipients.toJS()}
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
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.address} label={<Text>Address</Text>}
                          onChange={this.handleInputChange('address')}
                          keyProp='address'
                          boldLabel
                          validators={addressValidation.rules}
                          isValid={this.props.errors.get('address') === undefined}
                          errorMessage={this.props.errors.get('address')}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.accountNumber} label={<Text>Account Number / IBAN</Text>}
                          onChange={this.handleInputChange('accountNumber')}
                          keyProp='accountNumber'
                          boldLabel
                          validators={accountNumberValidation.rules}
                          isValid={this.props.errors.get('accountNumber') === undefined}
                          errorMessage={this.props.errors.get('accountNumber')}
                        />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings)}>
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
            </TitledContentBox>
        );
    }
}

Beneficiary.propTypes = {
    recipients: PropTypes.object.isRequired,
    countries: PropTypes.object.isRequired,

    recipient: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        recipients: state.transferSwift.get('recipients'),
        countries: state.transferSwift.get('countries'),

        recipient: state.transferSwift.getIn(['beneficiary', 'recipient']),
        country: state.transferSwift.getIn(['beneficiary', 'country']),
        address: state.transferSwift.getIn(['beneficiary', 'address']),
        accountNumber: state.transferSwift.getIn(['beneficiary', 'accountNumber']),
        city: state.transferSwift.getIn(['beneficiary', 'accountNumber']),

        errors: state.transferSwift.getIn(['errors', 'beneficiary'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Beneficiary);
