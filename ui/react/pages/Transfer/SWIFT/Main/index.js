import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import Text from 'ut-front-react/components/Text';

import { validateAll } from 'ut-front-react/utils/validator';
import Swift from './../../../../containers/Transfer/SWIFT';
import {getTransferValidations} from './../../../../containers/Transfer/SWIFT/Transfer/validations';
import {getSenderValidations} from './../../../../containers/Transfer/SWIFT/Sender/validations';
import {getBeneficiaryValidations} from './../../../../containers/Transfer/SWIFT/Beneficiary/validations';
import {getBankBeneficiaryValidations} from './../../../../containers/Transfer/SWIFT/BankBeneficiary/validations';
import {setErrors} from './../../../../containers/Transfer/SWIFT/actions';
import {prepareErrorsWithFullKeyPath} from './../../../../utils';

import transferStyle from '../../style.css';

class TransfersSWIFT extends Component {
//
    constructor(props) {
        super(props);
        this.createSwift = this.createSwift.bind(this);
    }

    createSwift() {
        let createValidationRules = [...getSenderValidations(), ...getBankBeneficiaryValidations(), ...getBeneficiaryValidations(), ...getTransferValidations()];
        let validation = validateAll(this.props.store, createValidationRules);
        if (!validation.isValid) {
            let errors = prepareErrorsWithFullKeyPath(validation.errors);
            this.props.setErrors(errors);
            // return;
        }
        // create
    }

    translate(key) {
        return this.context.translate(key);
    }

    get actionButtons() {
        let buttons = [{text: 'Create Swift', onClick: this.createSwift, styleType: 'primaryLight'}];
        return buttons;
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersSWIFT')} title={'SWIFT Transfers'} />
                <div className={transferStyle.pageContainer}>
                    <Header text={<Text>SWIFT Transfers</Text>} buttons={this.actionButtons} />
                    <Swift />
                </div>
            </Page>
        );
    }
//
}

TransfersSWIFT.contextTypes = {
    translate: PropTypes.func
};

TransfersSWIFT.propTypes = {
    store: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        store: state.transferSwift
    };
};

const mapDispatchToProps = {
    setErrors
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransfersSWIFT);
