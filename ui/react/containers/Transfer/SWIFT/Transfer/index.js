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
import {reasonValidation, otherBankCostsValidation, commentsValidation} from './validations';

class Transfer extends Component {
    handleInputChange(fieldName) {
        return (data) => {
            this.props.changeField(['transfer', fieldName], data.value, data);
        };
    }
    render() {
        return (
            <TitledContentBox title={<Text>Transfer</Text>}>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Dropdown
                          defaultSelected={this.props.priority}
                          label={<span><Text>Priority Of Transfer</Text> *</span>}
                          boldLabel
                          keyProp='priority'
                          isValid={this.props.errors.get('issuingBranchId') === undefined}
                          errorMessage={this.props.errors.get('issuingBranchId')}
                          onSelect={this.handleInputChange('priority')}
                          data={this.props.priorities.toJS()}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings, style.borderBottom)}>
                        <Input value={this.props.reason} label={<Text>Transfer Reason</Text>}
                          onChange={this.handleInputChange('reason')}
                          keyProp='reason'
                          boldLabel
                          validators={reasonValidation.rules}
                          isValid={this.props.errors.get('reason') === undefined}
                          errorMessage={this.props.errors.get('reason')}
                        />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={classnames(style.halfWidth, style.rowPaddings)}>
                        <Input value={this.props.otherBankCosts} label={<Text>Other Bank Costs</Text>}
                          onChange={this.handleInputChange('otherBankCosts')}
                          keyProp='otherBankCosts'
                          boldLabel
                          validators={otherBankCostsValidation.rules}
                          isValid={this.props.errors.get('otherBankCosts') === undefined}
                          errorMessage={this.props.errors.get('otherBankCosts')}
                        />
                    </div>
                    <div className={classnames(style.halfWidth, style.rowPaddings)}>
                        <Input value={this.props.comments} label={<Text>More Info</Text>}
                          onChange={this.handleInputChange('comments')}
                          keyProp='comments'
                          boldLabel
                          validators={commentsValidation.rules}
                          isValid={this.props.errors.get('comments') === undefined}
                          errorMessage={this.props.errors.get('comments')}
                        />
                    </div>
                </div>
            </TitledContentBox>
        );
    }
}

Transfer.propTypes = {
    priorities: PropTypes.object.isRequired,
    priority: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    otherBankCosts: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,

    changeField: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        priorities: state.transferSwift.get('priorityData'),
        priority: state.transferSwift.getIn(['transfer', 'priority']),
        reason: state.transferSwift.getIn(['transfer', 'reason']),
        otherBankCosts: state.transferSwift.getIn(['transfer', 'otherBankCosts']),
        comments: state.transferSwift.getIn(['transfer', 'comments']),

        errors: state.transferSwift.getIn(['errors', 'transfer'], immutable.Map())
    };
}

export default connect(
    mapStateToProps,
    {changeField}
)(Transfer);
