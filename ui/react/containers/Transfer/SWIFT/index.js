import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Sender from './Sender';
import BankBeneficiary from './BankBeneficiary';
import Beneficiary from './Beneficiary';
import Transfer from './Transfer';
import style from './style.css';

import nomeclaturesConfiguration from '../../../configuration/nomenclatures';
import {
    fetchNomenclatures,
    sendMessage
} from '../../../pages/Transfer/SWIFT/actions';

const propTypes = {
    // mapStateToProps
    mode: PropTypes.string,
    id: PropTypes.string,
    // mapDispatchToProps
    fetchNomenclatures: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
};

class Swift extends Component {
    componentDidMount() {
        this.props.fetchNomenclatures(nomeclaturesConfiguration);
        this.props.sendMessage();
    }
    render() {
        const { mode, id } = this.props;
        console.log(mode, id);
        return (
            <div className={style.contentBoxesWrapper}>
                <Sender mode={mode} id={id} />
                <BankBeneficiary mode={mode} id={id} />
                <Beneficiary mode={mode} id={id} />
                <Transfer mode={mode} id={id} />
            </div>
        );
    }
}

Swift.propTypes = propTypes;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    fetchNomenclatures,
    sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Swift);
