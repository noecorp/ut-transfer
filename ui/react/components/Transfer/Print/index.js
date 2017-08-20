import React, { Component, PropTypes } from 'react';

import Text from 'ut-front-react/components/Text';

import Header from './Header';
import Field from './Field';
import Title from './Title';
import print from './style.css';
import printConfig from './config';

class Print extends Component {
//
    translate(value) {
        return this.context.translate(value);
    }

    renderField(item) {
        let value = item.dataPath ? this.props.data.getIn(item.dataPath, '') : '';
        if (value === '' && item.defaultValue) {
            value = item.defaultValue;
        }
        return <Field label={item.label} value={value} flex={item.flex && item.flex} align={item.align && item.align} />;
    }

    renderTitle(item) {
        return <Title flex={item.flex && item.flex} heading={item.heading} summary={item.summary} />;
    }

    render() {
        return (
            <div className={print.pageWrap}>
                <div className={print.slipWrap}>
                    <Header />
                    {printConfig[this.props.transferType].map(row => {
                        return (<div className={print.row}>
                            {row.title && <div className={print.rowTitle}><Text>{row.title}</Text></div>}
                            <div className={print.rowItems}>
                                {row.items.map(item => {
                                    if (item.type === 'field') {
                                        return (this.renderField(item));
                                    }
                                    if (item.type === 'title') {
                                        return (this.renderTitle(item));
                                    }
                                })}
                            </div>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
//
}

Print.contextTypes = {
    translate: PropTypes.func
};

Print.propTypes = {
    transferType: PropTypes.oneOf([ 'budget', 'swift' ]),
    data: PropTypes.object
};

export default Print;
