import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import Text from 'ut-front-react/components/Text';
import style from './../style.css';

import {changeField} from '../../../../pages/Transfer/SWIFT/actions';
import {swiftValidation} from './validations';

class CorrespondendBankBeneficiary extends Component {
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
            this.props.changeField(['correspondentBankBeneficiary', fieldName], data.value, data);
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
                    />
                </div>
                <div className={style.inputWrap}>
                    <Input value={this.getInputValue('address')} label={<Text>Address</Text>}
                      onChange={this.handleInputChange('address')}
                      keyProp='address'
                      boldLabel
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
                      />
                </div>
                <div className={style.inputWrap}>
                    <Dropdown
                      defaultSelected={this.getInputValue('country')}
                      label={<span><Text>Country</Text></span>}
                      placeholder={this.translate('Select')}
                      boldLabel
                      keyProp='country'
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
            <TitledContentBox title={<Text>Correspondent Beneficiary Bank</Text>} externalContentClasses={style.contentBoxExternal}>
                <div className={style.formWrap}>
                    {this.renderLeftColumn()}
                    {this.renderRightColumn()}
                </div>
            </TitledContentBox>
        );
    }
}

CorrespondendBankBeneficiary.contextTypes = {
    translate: PropTypes.func
};

CorrespondendBankBeneficiary.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    isCountryDisabled: PropTypes.bool,
    data: PropTypes.object,
    edited: PropTypes.object,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { mode, id } = ownProps;
    return {
        data: state.transferSwift.getIn([mode, id, 'data', 'correspondentBankBeneficiary']),
        edited: state.transferSwift.getIn([mode, id, 'edited', 'correspondentBankBeneficiary'], immutable.Map()),
        countries: state.transferSwift.getIn([mode, id, 'nomenclatures', 'country']).toJS(),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'correspondentBankBeneficiary'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(CorrespondendBankBeneficiary);
