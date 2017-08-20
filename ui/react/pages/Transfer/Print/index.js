import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';

import PrintComponent from '../../../components/Transfer/Print';
import { setActiveTab, getTransfer } from './actions';

class Print extends Component {
//
    componentWillMount() {
        const { transferType, id } = this.props.params;
        this.props.setActiveTab({ transferType, transferId: id });
        this.props.getTransfer(id);
        this.state = {
            printDialogOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.size > 0 && !this.state.printDialogOpen) {
            setTimeout(() => {
                window.print();
                this.setState({ printDialogOpen: true });
            }, 750);
        }
    }

    render() {
        return (
            <PrintComponent
              data={this.props.data}
              transferType={this.props.params.transferType}
            />
        );
    }
//
}

Print.propTypes = {
    params: PropTypes.object,
    data: PropTypes.object,
    setActiveTab: PropTypes.func,
    getTransfer: PropTypes.func
};

const mapStateToProps = ({ transferPrint }, ownProps) => {
    const { transferType, id } = ownProps.params;
    return {
        data: transferPrint.getIn([transferType, id, 'data'], immutable.Map())
    };
};
const mapDispatchToProps = {
    setActiveTab,
    getTransfer
};

export default connect(mapStateToProps, mapDispatchToProps)(Print);
