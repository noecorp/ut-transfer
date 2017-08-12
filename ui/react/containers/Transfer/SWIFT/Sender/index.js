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

    renderLeftColumn() {
        return (
            <div className={style.contentBoxColumn}>
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
        );
    }

    renderRightColumn() {
        return (
            <div>

            </div>
        );
    }
    render() {
        return (
            <TitledContentBox title={<Text>Sender</Text>}>
                {this.renderLeftColumn()}
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
