import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-customer/ui/react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';
import DatePicker from 'ut-front-react/components/DatePicker/Simple';

import { editTransferField } from '../../../pages/Transfer/Budget/actions';
import { inputsConfig } from './config';
import style from './style.css';

class TransferBudgetCreate extends Component {
//
    constructor(props, context) {
        super(props, context);
        this.onInputChange = this.onInputChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    getDropdownData(key) {
        return this.props.dropdownData.get(key, immutable.List([])).toJS();
    }

    onInputChange({ key, value }) {
        const { editTransferField } = this.props;
        editTransferField({ field: key, value });
    }

    onDropdownChange({ key, value }) {
        const { editTransferField } = this.props;
        editTransferField({ field: key, value });
    }

    onDatePickerChange(field) {
        const { editTransferField } = this.props;
        return ({ value }) => {
            editTransferField({ field, value });
        };
    }

    renderTextInput({ index, input, value, readonly }) {
        return (
            <div key={index} className={style.inputWrap}>
                <Input
                  key={input.key}
                  type='text'
                  keyProp={input.key}
                  label={input.label}
                  placeholder={input.label}
                  value={value}
                  readonly={readonly}
                  onChange={this.onInputChange}
                />
            </div>
        );
    }

    renderDropdown({ index, input, value, readonly }) {
        const dropdownData = input.data || this.getDropdownData(input.key) || [];
        return (
            <div key={index} className={style.inputWrap}>
                <Dropdown
                  placeholder='Изберете...'
                  key={input.key}
                  data={dropdownData}
                  keyProp={input.key}
                  defaultSelected={value || input.placeholder}
                  label={input.label}
                  onSelect={this.onDropdownChange}
                />
            </div>
        );
    }

    renderDatePicker({ index, input, value, readonly }) {
        return (
            <DatePicker
              defaultValue={value}
              label={input.label}
              disabled={readonly}
              onChange={this.onDatePickerChange(input.key)} />
        );
    }

    renderInputs(inputs) {
        const { data, edited } = this.props;
        return inputs.map((input, index) => {
            let value = edited.has(input.key) ? edited.get(input.key) : data.get(input.key);
            let readonly = input.hasOwnProperty('readonly') ? input.readonly : false;
            switch (input.type) {
                case 'text':
                    return this.renderTextInput({ index, input, value, readonly });
                case 'dropdown':
                    return this.renderDropdown({ index, input, value, readonly });
                case 'datePicker':
                    return this.renderDatePicker({ index, input, value, readonly });
                default:
                    break;
            }
        });
    }

    render() {
        const { left, right } = inputsConfig;
        return (
        <div className={style.wrap}>
            <TitledContentBox title='Наредител'>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        {this.renderInputs(left)}
                    </div>
                    <div className={style.formRight}>
                        {this.renderInputs(right)}
                    </div>
                </div>
            </TitledContentBox>
        </div>);
    }
//
}

TransferBudgetCreate.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    // data
    data: PropTypes.object,
    edited: PropTypes.object,
    dropdownData: PropTypes.object,
    // actions
    editTransferField: PropTypes.func
};

const mapStateToProps = ({ transfersBudget }, ownProps) => {
    const { mode, id } = ownProps;
    return {
        accounts: transfersBudget.getIn(['remote', 'accounts']).toJS(),
        dropdownData: transfersBudget.getIn([mode, id, 'dropdownData']),
        data: transfersBudget.getIn([mode, id, 'data']),
        edited: transfersBudget.getIn([mode, id, 'edited'], immutable.Map())
    };
};
const mapDispatchToProps = {
    editTransferField
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
