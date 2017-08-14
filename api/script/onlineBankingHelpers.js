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

const createBudgetTransfer = ({ data, transferId, transferDateTime }) => {
    const budgetTransfer = {
        currency: 'BGN',
        transferId,
        sourceAccount: data.account,
        type: 'budgetTransfer',
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

const createSWIFTTransfer = ({ data, transferId, transferDateTime }) => {
    const swiftTransfer = {
        currency: data.sender.currency,
        transferId,
        sourceAccount: data.sender.account,
        type: 'SWIFTTransfer',
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

module.exports = {
    generateTransferDateTime,
    generateTransferId,
    createBudgetTransfer,
    createSWIFTTransfer
};
