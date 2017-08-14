import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import TitledContentBox from 'ut-front-react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Text from 'ut-front-react/components/Text';

import { amlDeclaration } from '../../../../pages/Transfer/commonStaticData';
import { changeField } from '../../../../pages/Transfer/SWIFT/actions';

import style from './../style.css';

class AMLDeclaration extends Component {
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
            this.props.changeField(['amlDeclaration', fieldName], data.value, data);
        };
    }

    render() {
        return (
            <TitledContentBox title={<Text>Declaration under art.4, para.7 and art.6, para.5, item.3 of the Law on Measures against Money Laundering</Text>}>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            <Dropdown
                              defaultSelected={this.getInputValue('fundsOrigin')}
                              label={<span><Text>Funds Origin</Text> *</span>}
                              placeholder={this.translate('Select')}
                              boldLabel
                              keyProp='fundsOrigin'
                              isValid={this.props.errors.get('fundsOrigin') === undefined}
                              errorMessage={this.props.errors.get('fundsOrigin')}
                              onSelect={this.handleInputChange('fundsOrigin')}
                              data={amlDeclaration}
                              className={style.rowPaddings}
                            />
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }
}

AMLDeclaration.contextTypes = {
    translate: PropTypes.func
};

AMLDeclaration.propTypes = {
    changeField: PropTypes.func.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object,
    edited: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const { mode, id } = ownProps;
    return {
        data: state.transferSwift.getIn([mode, id, 'data', 'amlDeclaration']),
        edited: state.transferSwift.getIn([mode, id, 'edited', 'amlDeclaration'], immutable.Map()),
        errors: state.transferSwift.getIn([mode, id, 'errors', 'amlDeclaration'], immutable.Map())
    };
};

const mapDispatchToProps = {
    changeField
};

export default connect(mapStateToProps, mapDispatchToProps)(AMLDeclaration);
