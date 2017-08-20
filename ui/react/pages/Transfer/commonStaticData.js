import React from 'react';
import Text from 'ut-front-react/components/Text';

export const bics = [
    { identifier: 'BUIN', bic: 'BUINBGSF', bank: 'ТБ Алианц България' },
    { identifier: 'CRBA', bic: 'CRBABGSF', bank: 'Алфа банк - клон България' },
    { identifier: 'BNPA', bic: 'BNPABGSX', bank: 'БНП Париба С.А.' },
    { identifier: 'BGUS', bic: 'BGUSBGSF', bank: 'Българо-американска кредитна банка' },
    { identifier: 'BPBI', bic: 'BPBIBGSF', bank: 'Пощенска банка' },
    { identifier: 'DEMI', bic: 'DEMIBGSF', bank: 'Търговска банка Д.' },
    { identifier: 'STSA', bic: 'STSABGSF', bank: 'Банка ДСК' },
    { identifier: 'BNBG', bic: 'BNBGBGSF', bank: 'Българска народна банка' },
    { identifier: 'BNBG', bic: 'BNBGBGSD', bank: 'Българска народна банка - РИНГС' },
    { identifier: 'BINV', bic: 'BINVBGSF', bank: 'Креди Агрикол България' },
    { identifier: 'TBIB', bic: 'TBIBBGSF', bank: 'Ти Би Ай Банк' },
    { identifier: 'ISBK', bic: 'ISBKBGSF', bank: 'Ишбанк АГ' },
    { identifier: 'IORT', bic: 'IORTBGSF', bank: 'Инвестбанк' },
    { identifier: 'INGB', bic: 'INGBBGSF', bank: 'ИНГ Банк Н.В' },
    { identifier: 'IABG', bic: 'IABGBGSF', bank: 'Интернешенъл Асет Банк' },
    { identifier: 'NASB', bic: 'NASBBGSF', bank: 'Българска банка за развитие' },
    { identifier: 'UBBS', bic: 'UBBSBGSF', bank: 'Обединена българска банка' },
    { identifier: 'SOMB', bic: 'SOMBBGSF', bank: 'Общинска банка' },
    { identifier: 'PRCB', bic: 'PRCBBGSF', bank: 'Прокредит банк' },
    { identifier: 'PIRB', bic: 'PIRBBGSF', bank: 'Банка Пиреос' },
    { identifier: 'FINV', bic: 'FINVBGSF', bank: 'Първа инвестиционна банка' },
    { identifier: 'RZBB', bic: 'RZBBBGSF', bank: 'Райфайзен банк България' },
    { identifier: 'BUIB', bic: 'BUIBBGSF', bank: 'СИБАНК' },
    { identifier: 'TTBB', bic: 'TTBBBG22', bank: 'Сосиете Женерал Експресбанк' },
    { identifier: 'TEXI', bic: 'TEXIBGSF', bank: 'Тексим банк' },
    { identifier: 'CITI', bic: 'CITIBGSF', bank: 'Ситибанк Н.А. - клон София' },
    { identifier: 'CREX', bic: 'CREXBGSF', bank: 'Токуда Банк' },
    { identifier: 'UNCR', bic: 'UNCRBGSF', bank: 'Уникредит Булбанк' },
    { identifier: 'TCZB', bic: 'TCZBBGSF', bank: 'Те-Дже Зираат Банкасъ - клон София' },
    { identifier: 'CECB', bic: 'CECBBGSF', bank: 'Централна кооперативна банка' }
];

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
