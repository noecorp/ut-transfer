import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchBox from 'ut-front-react/components/SearchBox';
import { changeFilter, selectCustomFilter } from '../../actions';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Text from 'ut-front-react/components/Text';
import style from '../../../style.css';

const placeHolder = '__placeholder__';
const customFilters = [
    // {key: 'batchId', name: 'Batch ID'},
    {key: 'batchName', name: 'Batch Name'},
    {key: 'account', name: 'Batch Account'}
];
export class BySearch extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSearch(record) {
        var key = this.refs.Dropdown.state.value;
        if (record.length > 0 && key !== placeHolder) {
            this.props.changeFilter({'key': key, value: record});
        }
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
             <div>
                <div className={style.customSearchDropdown}>
                    <Dropdown ref='Dropdown'
                      canSelectPlaceholder
                      placeholder={<Text>Search By</Text>}
                      keyProp='name'
                      onSelect={this.handleSelect}
                      defaultSelected={(this.props.customFilterSelected || {}).key}
                      data={customFilters}
                    />
                </div>
                <div className={style.customSearchTextField}>
                    <SearchBox defaultValue={value} placeholder={this.props.customFilterSelected ? 'By ' + this.props.customFilterSelected.name : 'Search'} onSearch={this.handleSearch} />
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
