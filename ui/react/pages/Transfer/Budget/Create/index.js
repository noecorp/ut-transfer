import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';

import TransferBudgetCreateContainer from '../../../../containers/Transfer/Budget/Create';

import transferStyle from '../../style.css';

class TransferBudgetCreate extends Component {
//
    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={'Create Budget Transfer'} />
                <div className={transferStyle.pageContainer}>
                    <Header text={'Create Budget Transfer'} />
                    <div className={transferStyle.transferContainer}>
                        <TransferBudgetCreateContainer mode='create' id='create' />
                    </div>
                </div>
            </Page>
        );
    }
//
}

TransferBudgetCreate.propTypes = {
    getScreenConfiguration: PropTypes.func,
    fetchAccounts: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
