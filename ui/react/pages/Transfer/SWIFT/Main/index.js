import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';

import trasnferStyle from '../../style.css';

class TransfersSWIFT extends Component {
//
    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersSWIFT')} title={'SWIFT Transfers'} />
                <div className={trasnferStyle.pageContainer}>
                    <Header text={'SWIFT Transfers'} />
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
)(TransfersSWIFT);
