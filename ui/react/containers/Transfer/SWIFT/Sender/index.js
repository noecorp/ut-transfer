import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';
import classnames from 'classnames';

import {changeField} from './../actions';
import {phoneValidation, nameValidation, ibanOrdererValidation, addressValidation, cityValidation} from './validations';

class Orderer extends Component {
    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['sender', fieldName], data.value, data);
        };
    }
    render() {
        return (
            <TitledContentBox title={<Text>Sender</Text>}>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Dropdown
                          defaultSelected={this.props.sourceAccount}
                          label={<span><Text>Source Account</Text> *</span>}
                          boldLabel
                          keyProp='sourceAccount'
                          isValid={this.props.errors.get('sourceAccount') === undefined}
                          errorMessage={this.props.errors.get('sourceAccount')}
                          onSelect={this.handleInputChange('sourceAccount')}
                          data={this.props.sourceAccounts.toJS()}
                          className={style.rowPaddings}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.phone} label={<Text>Phone</Text>}
                          onChange={this.handleInputChange('phone')}
                          keyProp='phone'
                          boldLabel
                          validators={phoneValidation.rules}
                          isValid={this.props.errors.get('phone') === undefined}
                          errorMessage={this.props.errors.get('phone')}
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
                        <Input value={this.props.ibanOrderer} label={<Text>Sender IBAN</Text>}
                          onChange={this.handleInputChange('ibanOrderer')}
                          keyProp='ibanOrderer'
                          boldLabel
                          validators={ibanOrdererValidation.rules}
                          isValid={this.props.errors.get('ibanOrderer') === undefined}
                          errorMessage={this.props.errors.get('ibanOrderer')}
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
                        copy from reports sum and currency
                    </div>
                </div>
                <div className={style.row}>
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
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Dropdown
                          defaultSelected={this.props.transferDestination}
                          label={<span><Text>Source Account</Text> *</span>}
                          boldLabel
                          keyProp='transferDestination'
                          isValid={this.props.errors.get('transferDestination') === undefined}
                          errorMessage={this.props.errors.get('transferDestination')}
                          onSelect={this.handleInputChange('transferDestination')}
                          data={this.props.transferDestinations.toJS()}
                          className={style.rowPaddings}
                        />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings)}>
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
            </TitledContentBox>
        );
    }
}

Orderer.propTypes = {
    sourceAccounts: PropTypes.object.isRequired,
    transferDestinations: PropTypes.object.isRequired,
    countries: PropTypes.object.isRequired,
    sourceAccount: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ibanOrderer: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    sum: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    transferDestination: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        sourceAccounts: state.transferSwift.get('sourceAccounts'),
        transferDestinations: state.transferSwift.get('transferDestinations'),
        countries: state.transferSwift.get('countries'),

        sourceAccount: state.transferSwift.getIn(['sender', 'sourceAccount']),
        phone: state.transferSwift.getIn(['sender', 'phone']),
        name: state.transferSwift.getIn(['sender', 'name']),
        ibanOrderer: state.transferSwift.getIn(['sender', 'ibanOrderer']),
        address: state.transferSwift.getIn(['sender', 'address']),
        sum: state.transferSwift.getIn(['sender', 'sum']),
        currency: state.transferSwift.getIn(['sender', 'currency']),
        city: state.transferSwift.getIn(['sender', 'city']),
        transferDestination: state.transferSwift.getIn(['sender', 'transferDestination']),
        country: state.transferSwift.getIn(['sender', 'country']),

        errors: state.transferSwift.getIn(['errors', 'sender'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Orderer);
