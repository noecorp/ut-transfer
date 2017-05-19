import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Input from 'ut-front-react/components/Input';
import style from '../../../style.css';

export class BatchDetailPopup extends Component {

    componentWillMount() {
        this.props.actions.getBatch(this.props.batchId);
    }
    render() {
        let {batchDetails} = this.props;
        return (
            <div className={style.uploadForm}>
                <div className={style.outerStatus}>
                    <span className={style.innerStatusLabel}>Status:</span>
                    <span className={style.innerStatusSign}>{batchDetails.status}</span>
                </div>
                <div className={style.row}>
                        <Input value={batchDetails.info} label='Comment:' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
                </div>
                <hr />
                    {/* <div className={style.row}>
                    <span className={style.label}>Filename:</span>
                    <Input value={batchDetails.originalFileName} readonly inputWrapClassName={style.inputWrapClassName} />
                    <label htmlFor='batch' className={style.replaceBtn}>Replace</label>
                    <label className={style.downloadBtn}>Download</label>
                </div>
                <div className={style.buttonsWrapper}>
                    <div className={style.buttonsInnerWrapper}>
                        <input className={style.inputDisplay} ref='batch' type='file' name='batch' id='batch' accept='text/csv' onChange={() => this.props.actions.setField('originalFileName', this.refs.batch.files[0].name)} />
                    </div>
                </div> */}
                <div className={style.row}>
                        <Input value={batchDetails.name} label='* Batch Name:' readonly={!this.props.canEdit} inputWrapClassName={style.inputWrapClassName} onChange={({value}) => this.props.actions.setField('batchDetails,name', value)} />
                </div>
                <div className={style.row}>
                    <Input value={batchDetails.paymentsCount} label='Number of records:' readonly inputWrapClassName={style.inputWrapClassName} />
                </div>
                <div className={style.row}>
                    <Input value={new Date(batchDetails.updatedOn).toLocaleString()} label='Updated On:' readonly inputWrapClassName={style.inputWrapClassName} />
                </div>
            </div>
        );
    }
}

BatchDetailPopup.propTypes = {
    actions: PropTypes.object,
    batchDetails: PropTypes.object,
    batchId: PropTypes.string,
    canEdit: PropTypes.bool
};

export default connect(
    (state, ownProps) => {
        return {
            batchDetails: state.bulkBatch.get('batchDetails').toJS(),
            batchId: state.bulkBatch.getIn(['selectedBatch', 'batchId'])
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        };
    }
)(BatchDetailPopup);
