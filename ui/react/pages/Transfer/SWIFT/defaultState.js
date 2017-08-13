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
