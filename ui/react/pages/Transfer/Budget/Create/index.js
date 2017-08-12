import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';

import TransferBudgetContainer from '../../../../containers/Transfer/Budget';
import {
    setActiveTab,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData
} from '../actions';

import transferStyle from '../../style.css';

class TransferBudgetCreate extends Component {
//
    componentWillMount() {
        this.props.setActiveTab({ mode: 'create', id: 'create' });
        this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
        this.props.fetchCustomerData();
        this.props.fetchAccounts();
    }

    translate(key) {
        return this.context.translate(key);
    }

    get actionButtons() {
        return [
            { text: this.translate('Create and Close'), performFullValidation: true, onClick: () => {}, styleType: 'primaryLight' },
            { text: this.translate('Create'), performFullValidation: true, onClick: () => {} },
            { text: this.translate('Close'), onClick: () => {} }
        ];
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={this.translate('Transfer to the Budget')} />
                <div className={transferStyle.pageContainer}>
                    <Header
                      text={this.translate('Payment slip (transfer to the Budget)')}
                      buttons={this.actionButtons} />
                    <div className={transferStyle.transferContainer}>
                        <TransferBudgetContainer mode='create' id='create' />
                    </div>
                </div>
            </Page>
        );
    }
//
}

TransferBudgetCreate.contextTypes = {
    translate: PropTypes.func
};

TransferBudgetCreate.propTypes = {
    getScreenConfiguration: PropTypes.func,
    fetchAccounts: PropTypes.func,
    fetchCustomerData: PropTypes.func,
    setActiveTab: PropTypes.func
};

const mapStateToProps = ({ transfersCommon, transfersBudget }, ownProps) => ({});
const mapDispatchToProps = {
    setActiveTab,
    getScreenConfiguration,
    fetchAccounts,
    fetchCustomerData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
