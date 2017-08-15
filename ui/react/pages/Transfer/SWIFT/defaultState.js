// import { confirmTransferPopupDefaultState } from '../../../containers/Transfer/ConfirmTransferPopup/defaultState';

export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: {
            remote: {

            },
            dropdownData: {
                account: []
            },
            // confirmTransferPopup: confirmTransferPopupDefaultState,
            data: {
                sender: {
                    sourceAccount: '',
                    phone: '',
                    name: '',
                    ibanOrderer: '',
                    address: '',
                    sum: '',
                    currency: '',
                    city: '',
                    transferDestination: '',
                    country: ''
                },
                bankBeneficiary: {
                    swift: '',
                    city: '',
                    name: '',
                    country: '',
                    address: ''
                },
                beneficiary: {
                    recipient: '',
                    country: '',
                    address: '',
                    accountNumber: '',
                    city: ''
                },
                transfer: {
                    priority: '',
                    reason: '',
                    otherBankCosts: '',
                    comments: ''
                },
                amlDeclaration: {
                    fundsOrigin: ''
                },
                expenses: {
                    expenses: ''
                }
            },
            nomenclatures: {
                currency: [],
                country: []
            },
            errors: {}
        }
    }
};
