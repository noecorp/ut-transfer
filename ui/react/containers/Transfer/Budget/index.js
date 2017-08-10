import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TitledContentBox from 'ut-customer/ui/react/components/TitledContentBox';
import Dropdown from 'ut-front-react/components/Input/Dropdown';
import Input from 'ut-front-react/components/Input';

import style from './style.css';

class TransferBudgetCreate extends Component {
//
    renderMainInfo() {
        const { accountsDropdownData, documentTypes } = this.props;
        return (
            <TitledContentBox title='Наредител'>
                <div className={style.formWrap}>
                    <div className={style.formLeft}>
                        <div className={style.inputWrap}>
                            <Dropdown label='Изберете сметка' placeholder='Изберете сметка' data={accountsDropdownData} />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Име на задължено лице' placeholder='Име на задължено лице' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='ЕГН/ЛНЧ на задължено лице' placeholder='ЕГН/ЛНЧ на задължено лице' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='БУЛСТАТ на задълженото лице' placeholder='Булстат' />
                        </div>
                        <div className={style.inputWrap}>
                            <Dropdown label='Име на получател' placeholder='Изберете сметка' data={[]} />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='IBAN' placeholder='IBAN' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='BIC' placeholder='BIC' />
                        </div>
                    </div>
                    <div className={style.formRight}>
                        <div className={style.inputWrap}>
                            <Dropdown label='Вид плащане' placeholder='Вид плащане' data={[]} />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Сума' placeholder='Сума' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Основание' placeholder='Основание' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Още пояснения' placeholder='Още пояснения' />
                        </div>
                        <div className={style.inputWrap}>
                            <Dropdown label='Вид на документа, по който се плаща' placeholder='Докуемнт' data={documentTypes} />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Номер на документ' placeholder='Номер на документ' />
                        </div>
                        <div className={style.inputWrap}>
                            <Input label='Дата на документ' placeholder='Дата на документа' />
                        </div>
                    </div>
                </div>
            </TitledContentBox>
        );
    }

    render() {
        return (
        <div className={style.wrap}>
            {this.renderMainInfo()}
        </div>);
    }
//
}

TransferBudgetCreate.propTypes = {
    mode: PropTypes.string,
    id: PropTypes.string,
    documentTypes: PropTypes.array,
    accountsDropdownData: PropTypes.array,
    accounts: PropTypes.array
};

const mapStateToProps = ({ transfersBudget }, ownProps) => {
    const { mode, id } = ownProps;
    return {
        accounts: transfersBudget.getIn(['remote', 'accounts']).toJS(),
        accountsDropdownData: transfersBudget.getIn([mode, id, 'dropdownData', 'accounts']).toJS(),
        documentTypes: transfersBudget.getIn([mode, id, 'dropdownData', 'documentTypes']).toJS()
    };
};
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferBudgetCreate);
