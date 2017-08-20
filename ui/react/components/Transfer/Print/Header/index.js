import React, { Component } from 'react';
import Text from 'ut-front-react/components/Text';
import style from './style.css';

class Header extends Component {
    render() {
        return (
            <div className={style.headerWrap}>
                <div className={style.leftCol}>
                    <div className={style.rowLeft}>
                        <div className={style.labelLeft}><Text>To</Text></div>
                        <div className={style.fieldLeft} />
                    </div>
                    <div className={style.rowLeft}>
                        <div className={style.labelLeft}><Text>Branch</Text></div>
                        <div className={style.fieldLeft} />
                    </div>
                    <div className={style.rowLeft}>
                        <div className={style.labelLeft}><Text>Address</Text></div>
                        <div className={style.fieldLeft} />
                    </div>
                </div>
                <div className={style.rightCol}>
                    <div className={style.rowRight}>
                        <div className={style.fieldRight} />
                        <div className={style.labelRight}><Text>Unique Registration Number</Text></div>
                    </div>
                    <div className={style.rowRight}>
                        <div className={style.fieldRight} />
                        <div className={style.labelRight}><Text>Date of presenting</Text></div>
                    </div>
                    <div className={style.rowRight}>
                        <div className={style.fieldRight} />
                        <div className={style.labelRight}><Text>Orderer's Signature</Text></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
