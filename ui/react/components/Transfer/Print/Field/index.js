import React, { Component, PropTypes } from 'react';
import Text from 'ut-front-react/components/Text';
import style from './style.css';

class Field extends Component {
//
    render() {
        return (
            <div style={{flex: this.props.flex}} className={style.fieldWrap}>
                <label className={style.label}>
                    <Text>{this.props.label}</Text>
                </label>
                <div className={style.field} style={{textAlign: this.props.align}}>{this.props.value.toUpperCase()}</div>
            </div>
        );
    }
//
}

Field.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    align: PropTypes.oneOf([
        'left', 'right'
    ]),
    flex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

Field.defaultProps = {
    flex: '1',
    value: '',
    align: 'left'
};

export default Field;
