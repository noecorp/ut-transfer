import React from 'react';
import Text from 'ut-front-react/components/Text';
import { countriesToShowRoutingNumber } from '../../../containers/Transfer/SWIFT/Beneficiary/helpers';

const cyrrilicToLatinMap = new Map([
    ['А', 'A'],
    ['Б', 'B'],
    ['В', 'V'],
    ['Г', 'G'],
    ['Д', 'D'],
    ['Е', 'E'],
    ['Ж', 'ZH'],
    ['З', 'Z'],
    ['И', 'I'],
    ['Й', 'Y'],
    ['К', 'K'],
    ['Л', 'L'],
    ['М', 'M'],
    ['Н', 'N'],
    ['О', 'O'],
    ['П', 'P'],
    ['Р', 'R'],
    ['С', 'S'],
    ['Т', 'T'],
    ['У', 'U'],
    ['Ф', 'F'],
    ['Х', 'H'],
    ['Ц', 'TS'],
    ['Ч', 'CH'],
    ['Ш', 'SH'],
    ['Щ', 'SHT'],
    ['Ъ', 'A'],
    ['Ь', 'Y'],
    ['Ю', 'YU'],
    ['Я', 'YA']
]);

export const formatRuleItems = (items) => {
    let formattedPayload = {};

    items.map(item => {
        if (!formattedPayload[item.type]) {
            formattedPayload[item.type] = [];
        }
        formattedPayload[item.type].push({
            key: item.display,
            name: item.display
        });
    });

    return formattedPayload;
};

export const prepareTransferSwiftToSend = (data, auth) => {
    return {
        data: data.toJS(),
        auth
    };
};

export const transformValue = (value) => {
    let uppercased = value.toUpperCase();
    let transliterated = [];
    for (var i = 0; i < value.length; i++) {
        let char = uppercased[i];
        if (cyrrilicToLatinMap.has(char)) {
            transliterated.push(cyrrilicToLatinMap.get(char));
        } else {
            transliterated.push(char);
        }
    };
    return transliterated.join('');
};

export const performCustomValidations = (data, validationResult) => {
    if (data.getIn(['sender', 'sum']) && Number(data.getIn(['sender', 'sum'])) > 30000 && !data.getIn(['amlDeclaration', 'fundsOrigin'])) {
        validationResult.isValid = false;
        validationResult.errors.push({
            key: ['amlDeclaration', 'fundsOrigin'],
            errorMessage: <Text>Funds Origin is required</Text>
        });
    }
    if (data.getIn(['beneficiary', 'country']) &&
        !!countriesToShowRoutingNumber[data.getIn(['beneficiary', 'country'])] &&
        !data.getIn(['beneficiary', 'routingNumber'])) {
        validationResult.isValid = false;
        validationResult.errors.push({
            key: ['beneficiary', 'routingNumber'],
            errorMessage: <Text>Routing Number is required</Text>
        });
    }
};
