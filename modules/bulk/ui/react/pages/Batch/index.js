import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {getLink} from 'ut-front/react/routerHelper';
import { AddTab } from 'ut-front-react/containers/TabMenu';
import Header from 'ut-front-react/components/PageLayout/Header';
import resizibleTypes from 'ut-front-react/components/ResiziblePageLayout/resizibleTypes';
import ResizibleContainer from 'ut-front-react/components/ResiziblePageLayout/Container';
import GridToolbox from 'ut-front-react/components/SimpleGridToolbox';
import Popup from 'ut-front-react/components/Popup';
import mainStyle from 'ut-front-react/assets/index.css';
import style from '../style.css';
import Filters from './Filters';
import Toolbox from './ToolBox';
import BulkBatchGrid from './Grid';
import Pagination from './Filters/Pagination';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import UploadForm from './UploadForm';
import DetailEdit from './Popups/Details';
import AdvancedSearch from './Popups/AdvanceSearch';
import Button from 'ut-front-react/components/StandardButton';

const defaultAsideWidth = 200;
const popUps = {
    batchDetailsPopup: 'batchDetailsPopup',
    batchUploadPopup: 'batchUploadPopup',
    batchSearch: 'batchSearch'
};

class BulkBatch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isPopupOpen: false,
            popupFor: ''
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.permissions = {
            canEdit: this.context.checkPermission('bulk.batch.edit')
        };
    }
    toggleFilter() {
        this.props.actions.toggleFilter();
    }
    componentWillMount() {
        this.props.actions.fetchBatchTypes();
    }
    togglePopup(popupFor) {
        this.setState({
            isPopupOpen: !this.state.isPopupOpen,
            popupFor: popupFor
        });
    }
    getTitle(batchTypeName) {
        return 'Bulk Payments - ' + title();
        function title() {
            switch (batchTypeName) {
                case 'debit':
                    return 'Debit';
                case 'credit':
                    return 'Credit';
                case 'merchants':
                    return 'Credit Merchants';
                default:
                    return 'Batch';
            }
        }
    }
    getDetailsAction() {
        let buttons = []; var self = this;
        var canEditByStatus = this.props.selectedBatch && ['new', 'rejected'].includes(this.props.selectedBatch.get('status').toLowerCase());
        if (this.permissions.canEdit && canEditByStatus) {
            buttons.push({
                label: 'Save',
                disabled: !!self.props.errors.get('batchDetails') && self.props.errors.get('batchDetails').size > 0,
                type: 'submit',
                onClick: () => {
                    let {batchDetails} = self.props;
                    self.props.actions.saveBatch(batchDetails.toJS());
                    self.togglePopup();
                },
                styleType: 'primaryDialog'
            });
        }
        if (this.state.popupFor === popUps.batchSearch) {
            buttons.push({
                label: 'Search',
                type: 'submit',
                onClick: () => {
                    let filters = this.props.filters;
                    self.props.actions.changeFilter({'key': filters, value: filters.value});
                    self.togglePopup();
                },
                styleType: 'primaryDialog'
            });
        }
        buttons.push({
            label: 'Cancel',
            onClick: this.togglePopup,
            styleType: 'secondaryDialog'
        });
        return buttons;
    }
    getPopupActions() {
        switch (this.state.popupFor) {
            case popUps.batchDetailsPopup:
                return this.getDetailsAction();
            case popUps.batchSearch:
                return this.getDetailsAction();
            default:
                return [{
                    label: 'Cancel',
                    onClick: this.togglePopup,
                    styleType: 'secondaryDialog'
                }];
        }
    }
    getPopUpContent() {
        var canEditByStatus = this.props.selectedBatch && ['new', 'rejected'].includes(this.props.selectedBatch.get('status').toLowerCase());
        switch (this.state.popupFor) {
            case popUps.batchDetailsPopup:
                return (<DetailEdit canEdit={this.permissions.canEdit && canEditByStatus} />);
            case popUps.batchSearch:
                return (<AdvancedSearch />);
            default:
                return null;
        }
    }
    getPopUpTitle() {
        switch (this.state.popupFor) {
            case popUps.batchDetailsPopup:
                return 'Batch Details';
            case popUps.batchSearch:
                return 'Advanced Search';
            default:
                return null;
        }
    }
    render() {
        var self = this;
        let { selectedBatch, batchTypeName } = this.props;
        let contentNormalWidth = window.innerWidth - defaultAsideWidth;
        var content = (
            <div className={mainStyle.contentTableWrap}>
                <div className={mainStyle.actionBarWrap}>
                    {
                        <GridToolbox
                          title={selectedBatch && !self.props.showFilter ? 'Show Filters' : selectedBatch ? 'Show Buttons' : 'Filter by'}
                          toggle={this.toggleFilter}
                          isTitleLink={!!selectedBatch}
                          opened>
                            { selectedBatch && !self.props.showFilter ? (
                              <div className={style.actionWrap}>
                                <Toolbox togglePopup={this.togglePopup} batchTypeName={batchTypeName} />
                               </div>
                            ) : <div className={style.filterWrap}><div><Filters /></div><div><Button className='defaultBtn' text='Advanced Search' label='Search' onClick={() => { self.togglePopup(popUps.batchSearch); }} /></div>
                            </div>}
                        </GridToolbox>
                    }
                </div>
                 <BulkBatchGrid batchTypeName={batchTypeName} togglePopup={this.togglePopup} />
                 <Pagination />
            </div>
        );
        var resizibleContainerCols = [
            {type: resizibleTypes.CONTENT, id: 'roleContent', width: contentNormalWidth, normalWidth: contentNormalWidth, child: content}
        ];
        return (
            <div>
                <AddTab pathname={getLink('ut-transfer:bulkBatch', {batchTypeName: this.props.batchTypeName})} title={this.getTitle(this.props.batchTypeName)} />
                <Header text={this.getTitle(this.props.batchTypeName)}
                  buttons={[{text: 'Create Batch', onClick: () => { self.togglePopup(popUps.batchUploadPopup); }}]} />
                <ResizibleContainer cols={resizibleContainerCols} />
                <Popup
                  isOpen={self.state.isPopupOpen && this.state.popupFor !== popUps.batchUploadPopup}
                  header={{text: this.getPopUpTitle()}}
                  closePopup={self.togglePopup}
                  footer={{actionButtons: this.getPopupActions()}}>
                  { self.state.isPopupOpen && this.state.popupFor !== popUps.batchUploadPopup ? this.getPopUpContent() : (<div />)}
                </Popup>
                {this.state.isPopupOpen && this.state.popupFor === popUps.batchUploadPopup &&
                    <UploadForm
                      onClose={this.togglePopup}
                      batchTypeName={this.props.batchTypeName}
                    />
                }
            </div>
        );
    }
}

BulkBatch.propTypes = {
    selectedBatch: PropTypes.object,
    showFilter: PropTypes.bool,
    errors: PropTypes.object,
    batchDetails: PropTypes.object,
    batchTypeName: PropTypes.string,
    actions: PropTypes.object,
    filters: PropTypes.object

};

BulkBatch.contextTypes = {
    checkPermission: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        batchTypeName: ownProps.params.batchTypeName,
        errors: state.bulkBatch.get('errors'),
        selectedBatch: state.bulkBatch.get('selectedBatch'),
        filters: state.bulkBatch.get('filters'),
        showFilter: state.bulkBatch.get('showFilter'),
        batchDetails: state.bulkBatch.get('batchDetails')
    };
}
export default connect(mapStateToProps, (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(BulkBatch);
