import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLink } from 'ut-front/react/routerHelper';
import Page from 'ut-front-react/components/PageLayout/Page';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import Text from 'ut-front-react/components/Text';
import Vertical from 'ut-front-react/components/Layout/Vertical.js';
import Button from 'ut-front-react/components/Button';

// import Print from '../../../../components/Transfer/Print';
import TransferBudgetContainer from '../../../../containers/Transfer/Budget';

import {
    setActiveTab,
    fetchAccounts,
    getTransfer
} from '../actions';

import transferStyle from '../../style.css';

class TransferBudgetDetails extends Component {
//
    componentWillMount() {
        this.props.setActiveTab({ mode: 'details', id: this.props.params.id });
        this.props.fetchAccounts();
        this.props.getTransfer(this.props.params.id);
    }

    translate(key) {
        return this.context.translate(key);
    }

    renderFeatureButtons() {
        return (
            <div className={transferStyle.templatesSection}>
                <div className={transferStyle.templatesButton}>
                    <Button sizeType='small' >{this.translate('Print')}</Button>
                </div>
                <div id='printContent' style={{ display: 'none' }}>
                    Print content
                </div>
                <iframe id='printIframe' style={{ height: '0', width: '0', position: 'absolute' }} />
            </div>
        );
    }

    render() {
        return (
            <Page>
                <AddTab pathname={getLink('ut-transfer:transfersBudgetDetails', { id: this.props.params.id })} title={'Budget Transfers'} />
                <Vertical fixedComponent={<Header text={<Text>Payment slip (Transfer to the Budget)</Text>} />} >
                    <div className={transferStyle.pageContainer}>
                        {this.renderFeatureButtons()}
                        <div className={transferStyle.transferContainer}>
                            <TransferBudgetContainer inputsAreReadonly mode='details' id={this.props.params.id} />
                        </div>
                    </div>
                </Vertical>
            </Page>
        );
    }
//
}

TransferBudgetDetails.contextTypes = {
    translate: PropTypes.func
};

TransferBudgetDetails.propTypes = {
    params: PropTypes.object,
    setActiveTab: PropTypes.func,
    fetchAccounts: PropTypes.func,
    getTransfer: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {
    setActiveTab,
    fetchAccounts,
    getTransfer
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetDetails);
