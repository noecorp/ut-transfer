export const confirmTransferPopupDefaultState = {
    data: {
        password: '',
        otp: ''
    },
    errors: {}
};

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
            confirmTransferPopup: confirmTransferPopupDefaultState,
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
