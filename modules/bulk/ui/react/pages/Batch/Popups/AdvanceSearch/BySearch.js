import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchBox from '../../../../components/SearchBox';
import { changeFilter, selectCustomFilter } from '../../actions';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Text from 'ut-front-react/components/Text';
import style from '../../../style.css';

const customFilters = [
    {key: 'batchName', name: 'Batch Name'},
    {key: 'account', name: 'Batch Account'}
];
export class BySearch extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleChange(record) {
        var key = this.refs.Dropdown.state.value;
        this.props.changeFilter({'key': key, value: record.value, requireFetch: false});
    }
    handleSelect(record) {
        var self = this;
        var selected = customFilters.find(function(filter) {
            return filter.key === record.value;
        });
        self.props.selectCustomFilter(selected);
        customFilters.forEach(function(filter) {
            self.props.changeFilter({'key': filter.key, value: null, requireFetch: false});
        });
    }
    render() {
        let {value} = this.props;
        return (
             <div className={style.row}>
                    <div className={style.searchDropdown}>
                    <Dropdown ref='Dropdown'
                      canSelectPlaceholder
                      placeholder={<Text>Search By</Text>}
                      keyProp='name'
                      onSelect={this.handleSelect}
                      defaultSelected={(this.props.customFilterSelected || {}).key}
                      data={customFilters}
                    />
                    </div>
                    <div className={style.searchTextField} >
                    <SearchBox value={value} placeholder={this.props.customFilterSelected ? 'By ' + this.props.customFilterSelected.name : 'Search'} onChange={this.handleChange} />
                </div>
                </div>
        );
    }
}

BySearch.propTypes = {
    changeFilter: PropTypes.func,
    selectCustomFilter: PropTypes.func,
    customFilterSelected: PropTypes.object,
    value: PropTypes.string
};

export default connect(
    (state) => {
        return {
            value: state.bulkBatch.getIn(['filters', state.bulkBatch.get('customFilterSelected')]),
            customFilterSelected: state.bulkBatch.get('customFilterSelected')
        };
    },
    {
        changeFilter,
        selectCustomFilter
    }
)(BySearch);
