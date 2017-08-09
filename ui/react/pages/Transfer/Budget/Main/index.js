import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';

import trasnferStyle from '../../style.css';

class TransfersBudget extends Component {
//
    get headerButtons() {
        return [{
            text: 'Create Budget Transfer',
            href: getLink('ut-transfer:transfersBudgetCreate'),
            styleType: 'primaryLight'
        }];
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudget')} title={'Budget Transfers'} />
                <div className={trasnferStyle.pageContainer}>
                    <Header text={'Budget Transfers'} buttons={this.headerButtons} />
                </div>
            </Page>
        );
    }
//
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransfersBudget);
