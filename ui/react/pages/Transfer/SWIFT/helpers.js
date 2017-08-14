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
