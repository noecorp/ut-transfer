export const defaultState = {
    activeTabData: {
        mode: '',
        id: ''
    },
    create: {
        create: {
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
            priorityData: [],
            countries: [],
            recipients: [],
            sourceAccounts: [],
            transferDestinations: [],
            nomenclatures: {
                currency: [],
                country: []
            },
            errors: {}
        }
    }
};
