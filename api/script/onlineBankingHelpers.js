const randomize = require('randomatic');

const pad = (number, size) => {
    var result = number + '';
    while (result.length < size) {
        result = '0' + result;
    }
    return result;
};

const generateTransferDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = pad(now.getMonth(), 2);
    const date = pad(now.getDate(), 2);
    const hours = pad(now.getHours(), 2);
    const minutes = pad(now.getMinutes(), 2);
    const transferDateTime = `${year}-${month}-${date} ${hours}:${minutes}`;
    return transferDateTime;
};

const generateTransferId = () => {
    const randomNumber1 = randomize('0', 4);
    const randomString1 = randomize('A', 4);
    const randomNumber2 = randomize('0', 6);
    const transferId = `TX${randomNumber1}${randomString1}${randomNumber2}`;
    return transferId;
};

const createBudgetTransfer = ({ data, transferId, id, transferDateTime }) => {
    const budgetTransfer = {
        currency: 'BGN',
        id,
        transferId,
        sourceAccount: data.account,
        transferType: 'budget',
        destinationAccount: {
            bank: data.bank,
            iban: data.iban,
            name: data.destinationName
        },
        reason: `${data.reason}`,
        debit: Number(data.amount),
        credit: 0,
        dateTime: transferDateTime
    };
    return budgetTransfer;
};

const createSWIFTTransfer = ({ data, transferId, id, transferDateTime }) => {
    const swiftTransfer = {
        currency: data.sender.currency,
        id,
        transferId,
        sourceAccount: data.sender.sourceAccount,
        transferType: 'swift',
        destinationAccount: {
            bank: data.bankBeneficiary.name,
            iban: data.beneficiary.accountNumber,
            name: data.beneficiary.recipient
        },
        reason: `${data.transfer.reason}`,
        debit: Number(data.sender.sum),
        credit: 0,
        dateTime: transferDateTime
    };
    return swiftTransfer;
};

const sortTransfers = (transfer1, transfer2) => {
    const transfer1Date = new Date(transfer1.dateTime);
    const transfer2Date = new Date(transfer2.dateTime);
    if (transfer1Date < transfer2Date) {
        return 1;
    }
    if (transfer1Date > transfer2Date) {
        return -1;
    }
    return 0;
};

const addTransfersToAccountsData = ({ accounts, transfers }) => {
    const accountsMap = new Map();
    for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        account.transfers = [];
        accountsMap.set(account.accountNumber, account);
    };
    for (let i = 0; i < transfers.length; i++) {
        let transfer = transfers[i];
        let accountNumber;
        if (typeof transfer.sourceAccount === 'number') {
            accountNumber = transfer.sourceAccount;
        }
        if (!accountNumber && typeof transfer.destinationAccount === 'number') {
            accountNumber = transfer.destinationAccount;
        }
        let account = accountsMap.get(accountNumber);
        account.transfers.push(transfer);
    }
    for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        let sortedTransfers = account.transfers.sort(sortTransfers);
        account.transfers = sortedTransfers;
    }
    return accounts;
};

module.exports = {
    generateTransferDateTime,
    generateTransferId,
    createBudgetTransfer,
    createSWIFTTransfer,
    addTransfersToAccountsData
};
