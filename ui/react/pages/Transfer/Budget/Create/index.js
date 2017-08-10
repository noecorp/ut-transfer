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

    get actionButtons() {
        return [
            { text: 'Създай и изпрати', performFullValidation: true, onClick: () => {}, styleType: 'primaryLight' },
            { text: 'Създай', performFullValidation: true, onClick: () => {} },
            { text: 'Затвори', onClick: () => {} }
        ];
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={'Плащане към бюджета'} />
                <div className={transferStyle.pageContainer}>
                    <Header
                      text={'Платежно нареждане (плащане към бюджета)'}
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
