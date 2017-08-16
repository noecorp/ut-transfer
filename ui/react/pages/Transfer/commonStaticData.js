import React from 'react';
import Text from 'ut-front-react/components/Text';

export const amlDeclaration = [
    { key: 'trading', name: <Text>Trading</Text> },
    { key: 'farming', name: <Text>Farming</Text> },
    { key: 'personalLaborServices', name: <Text>Providing services</Text> },
    { key: 'freelancing', name: <Text>Freelancing</Text> },
    { key: 'receivedLoan', name: <Text>Received a loan/credit</Text> },
    { key: 'sellOfProperty', name: <Text>Sell of property</Text> },
    { key: 'rent', name: <Text>Received rent</Text> },
    { key: 'gift', name: <Text>Received funds as a gift</Text> }
];

export const expenses = [
    { key: 'our', name: <Text>OUR - Expenses to the Sender</Text> },
    { key: 'ben', name: <Text>BEN - Expenses to the Beneficiary</Text> },
    { key: 'sha', name: <Text>SHA - Shared Expenses</Text> }
];

export const priorities = [
    { key: 'standard', name: <Text>Standard</Text> },
    { key: 'urgent', name: <Text>Urgent</Text> }
];
