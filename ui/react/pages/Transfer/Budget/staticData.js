export const bics = [
    { identifier: 'BUIN', bic: 'BUINBGSF', name: 'ТБ Алианц България' },
    { identifier: 'CRBA', bic: 'CRBABGSF', name: 'Алфа банк - клон България' },
    { identifier: 'BNPA', bic: 'BNPABGSX', name: 'БНП Париба С.А.' },
    { identifier: 'BGUS', bic: 'BGUSBGSF', name: 'Българо-американска кредитна банка' },
    { identifier: 'BPBI', bic: 'BPBIBGSF', name: 'Пощенска банка' },
    { identifier: 'DEMI', bic: 'DEMIBGSF', name: 'Търговска банка Д.' },
    { identifier: 'STSA', bic: 'STSABGSF', name: 'Банка ДСК' },
    { identifier: 'BNBG', bic: 'BNBGBGSF', name: 'Българска народна банка' },
    { identifier: 'BNBG', bic: 'BNBGBGSD', name: 'Българска народна банка - РИНГС' },
    { identifier: 'BINV', bic: 'BINVBGSF', name: 'Креди Агрикол България' },
    { identifier: 'TBIB', bic: 'TBIBBGSF', name: 'Ти Би Ай Банк' },
    { identifier: 'ISBK', bic: 'ISBKBGSF', name: 'Ишбанк АГ' },
    { identifier: 'IORT', bic: 'IORTBGSF', name: 'Инвестбанк' },
    { identifier: 'INGB', bic: 'INGBBGSF', name: 'ИНГ Банк Н.В' },
    { identifier: 'IABG', bic: 'IABGBGSF', name: 'Интернешенъл Асет Банк' },
    { identifier: 'NASB', bic: 'NASBBGSF', name: 'Българска банка за развитие' },
    { identifier: 'UBBS', bic: 'UBBSBGSF', name: 'Обединена българска банка' },
    { identifier: 'SOMB', bic: 'SOMBBGSF', name: 'Общинска банка' },
    { identifier: 'PRCB', bic: 'PRCBBGSF', name: 'Прокредит банк' },
    { identifier: 'PIRB', bic: 'PIRBBGSF', name: 'Банка Пиреос' },
    { identifier: 'FINV', bic: 'FINVBGSF', name: 'Първа инвестиционна банка' },
    { identifier: 'RZBB', bic: 'RZBBBGSF', name: 'Райфайзен банк България' },
    { identifier: 'BUIB', bic: 'BUIBBGSF', name: 'СИБАНК' },
    { identifier: 'TTBB', bic: 'TTBBBG22', name: 'Сосиете Женерал Експресбанк' },
    { identifier: 'TEXI', bic: 'TEXIBGSF', name: 'Тексим банк' },
    { identifier: 'CITI', bic: 'CITIBGSF', name: 'Ситибанк Н.А. - клон София' },
    { identifier: 'CREX', bic: 'CREXBGSF', name: 'Токуда Банк' },
    { identifier: 'UNCR', bic: 'UNCRBGSF', name: 'Уникредит Булбанк' },
    { identifier: 'TCZB', bic: 'TCZBBGSF', name: 'Те-Дже Зираат Банкасъ - клон София' },
    { identifier: 'CECB', bic: 'CECBBGSF', name: 'Централна кооперативна банка' }
];

export const paymentTypes = {
    '81': {
        'name': 'Приходи на централния бюджет',
        'codes': {
            '110000': 'Администрирани от НАП приходи за централния бюджет',
            '117011': 'Приходи от принудително събиране на вземания и от продажби на конфискувани активи'
        }
    },
    '84': {
        'name': 'Местни данъци и такси',
        'codes': {
            '441400': 'Окончателен годишен (патентен) данък',
            '442100': 'Данък върху недвижимите имоти',
            '442200': 'Данък върху наследствата',
            '442300': 'Данък върху превозните средства',
            '442400': 'Такса битови отпадъци',
            '442500': 'Данък при придобиване на им',
            '442800': 'Туристически данък',
            '443400': 'Други данъци',
            '443700': 'Вноски от приходи на общински предприятия и инстируции',
            '444000': 'Нетни приходи от продажби на услуги, стоки и продукция',
            '444100': 'Приходи от наеми на имущество',
            '444200': 'Приходи от наеми на земя',
            '444300': 'Приходи от лихви по текущи банкови сметки',
            '444400': 'Приходи от лихви по срочни депозити',
            '444800': 'Дивидент',
            '444900': 'Конфискувани средства и приходи от продажби на конфискувани вещи',
            '445100': 'Дарения, помощи и други безвъзмездно получени суми от страната',
            '445200': 'Дарения, помощи и други безвъзмездно получени суми от чужбина',
            '445500': 'Приходи от продажби на дълготрайни материални активи',
            '445600': 'Приходи от продажби на земя',
            '445700': 'Приходи от концесии',
            '445800': 'Приходи от ликвидиране на общински предприятия',
            '445900': 'Приходи от продажба на нематериални активи',
            '446500': 'Глоби, санкции и неустойки, нак. лихви, обезщетения и начети',
            '447000': 'Други неданъчни приходи',
            '448001': 'Такси за технически услуги',
            '448002': 'Такси за ползване на детски градини',
            '448003': 'Такси за ползване на детски ясли и други по здравеопазването',
            '448004': 'Такси за ползване на детски лагери и други по социалния отдих',
            '448005': 'Такси за ползване на домашен социален патронаж и други социални услуги',
            '448006': 'Такси за добив на кариерни материали',
            '448007': 'Такси за административни услуги',
            '448008': 'Такси за ползване на пазари, тържища и др.',
            '448009': 'Такси за ползване на полудневни детски градини',
            '448010': 'Такси за ползване на общежития и други по образованието',
            '448011': 'Такси за гробни места',
            '448012': 'Туристически такси',
            '448013': 'Такси за притежаване на куче',
            '448090': 'Други общински такси',
            '448081': 'Приходи от такси за общините по закона за опазване на околната средА'
        }
    },
    '85': {
        'name': 'Плащания към НАП и социалноосигурителните фондове към НОИ',
        'codes': {
            '551111': 'Осигурителни вноски и свързани с тях наказателни лихви за ДОО, УчПФ, фонд "Гарантирани вземания на работниците и служителите"'
        }
    },
    '86': {
        'name': 'Плащания към НЗОК',
        'codes': {
            '561111': 'Здравноосигурителни вноски и свързани с тях наказателни лихви за НЗОК'
        }
    },
    '88': {
        'name': 'Приходи за ДЗПО',
        'codes': {
            '581111': 'Осигурителни вноски и свързани с тях наказателни лихви за ДЗПО'
        }
    },
    '82': {
        'name': 'Плащания към агенция "Митници"',
        'codes': {
            '222800': 'Мита и митнически такси',
            '220800': 'ДДС при внос',
            '220300': 'Акциз при внос',
            '220200': 'Акциз при сделки в страната',
            '225000': 'Глоби, санкции и неустойки, наказателни лихви, обезщетения и начети',
            '227000': 'Други приходи'
        }
    }
};

export const documentTypes = [
    { key: '1', name: 'Декларация' },
    { key: '2', name: 'Ревизионен акт' },
    { key: '3', name: 'Наказателно постановление' },
    { key: '4', name: 'Авансова вноска' },
    { key: '5', name: 'Данъчен партиден номер на имот' },
    { key: '6', name: 'Постановление за принудително събиране' },
    { key: '9', name: 'Други' }
];
