import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Text from 'ut-front-react/components/Text';

import { expenses } from '../../../../pages/Transfer/commonStaticData';
import { changeField } from '../../../../pages/Transfer/SWIFT/actions';

import style from './../style.css';

class BankExpenses extends Component {
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
            this.props.changeField(['bankExpenses', fieldName], data.value, data);
        };
    }

    render() {
        return (
            <TitledContentBox title={<Text>Bank Expenses</Text>}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            <Dropdown
                              defaultSelected={this.getInputValue('expenses')}
                              label={<span><Text>Bank Expenses</Text> *</span>}
                              placeholder={this.translate('Select')}
                              boldLabel
                              keyProp='expenses'
                              isValid={this.props.errors.get('expenses') === undefined}
                              errorMessage={this.props.errors.get('expenses')}
                              onSelect={this.handleInputChange('expenses')}
                              data={expenses}
                              className={style.rowPaddings}
                            />
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }
}

BankExpenses.contextTypes = {
    translate: PropTypes.func
};

BankExpenses.propTypes = {
    changeField: PropTypes.func.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object,
    edited: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const { mode, id } = ownProps;
    return {
        data: state.transferSwift.getIn([mode, id, 'data', 'expenses']),
        edited: state.transferSwift.getIn([mode, id, 'edited', 'expenses'], immutable.Map()),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'expenses'], immutable.Map())
    };
};

const mapDispatchToProps = {
    changeField
};

export default connect(mapStateToProps, mapDispatchToProps)(BankExpenses);
