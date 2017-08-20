import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Text from 'ut-front-react/components/Text';
import style from './style.css';

class Title extends Component {
//
    render() {
        return (
            <div style={{flex: this.props.flex}} className={style.titleWrap}>
                <div className={classnames(style.row, style.rowLarge)}><Text>{this.props.heading}</Text></div>
                <div className={style.row}><Text>{this.props.summary}</Text></div>
            </div>
        );
    }
//
}

Title.propTypes = {
    heading: PropTypes.string,
    summary: PropTypes.string,
    flex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

Title.defaultProps = {
    flex: '1',
    value: '',
    heading: 'Heading',
    summary: 'Summary'
};

export default Title;
