import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';

import {
    getScreenConfiguration
} from '../actions';

import trasnferStyle from '../../style.css';

class TransferBudgetCreate extends Component {
//
    componentWillMount() {
        this.props.getScreenConfiguration({ key: 'transferBudgetCreate' });
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetCreate')} title={'Create Budget Transfer'} />
                <div className={trasnferStyle.pageContainer}>
                    <Header text={'Create Budget Transfer'} />
                </div>
            </Page>
        );
    }
//
}

TransferBudgetCreate.propTypes = {
    getScreenConfiguration: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {
    getScreenConfiguration
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
