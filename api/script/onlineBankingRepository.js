const path = require('path');
const fs = require('fs');

// TODO: Make these functions return promises and avoid using fs synchronous methods.

const dataTypes = {
    accounts: 'accounts',
    transfers: 'transfers',
    transfersDetails: 'transfersDetails',
    templates: 'templates',
    otp: 'otp'
};

const dataTypesFilenameMap = {
    accounts: 'accounts.json',
    transfers: 'transfers.json',
    transfersDetails: 'transfersDetails.json',
    templates: 'templates.json',
    otp: 'otp.json'
};

const readData = (dataType) => {
    const mockFilePath = path.resolve(__dirname, '../', '../', 'mocks', 'onlineBanking', dataTypesFilenameMap[dataType]);
    const mockData = fs.readFileSync(mockFilePath, 'UTF-8');
    const data = JSON.parse(mockData);
    return data;
};

const writeData = (dataType, data) => {
    const mockFilePath = path.resolve(__dirname, '../', '../', 'mocks', 'onlineBanking', dataTypesFilenameMap[dataType]);
    const mockData = JSON.stringify(data);
    fs.writeFileSync(mockFilePath, mockData);
};

const getNewTransferId = () => {
    const transfersData = readData(dataTypes.transfers);
    const lastTransfer = transfersData.transfers[transfersData.transfers.length - 1];
    return lastTransfer.id + 1;
};

module.exports = {
    readData,
    writeData,
    dataTypes,
    getNewTransferId
};
