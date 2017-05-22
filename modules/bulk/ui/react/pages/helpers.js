import { textValidations } from 'ut-front-react/validator/constants.js';

export const validations = {
    batchNameValidations: [
        {type: textValidations.isRequired, errorMessage: 'Please enter the batch name'}
    ],
    customerNameValidations: [
        {type: textValidations.isRequired, errorMessage: 'Please enter the customer name'}
    ],
    amountValidations: [
        {type: textValidations.isRequired, errorMessage: 'Please enter the amount'},
        {type: textValidations.regex, value: /^\d+(\.\d{1,2})?$/, errorMessage: 'Please enter the valid amount'}
    ],
    accountValidations: [
        {type: textValidations.isRequired, errorMessage: 'Please enter account number'}
    ]
};
export function reduceObject(columns, object) {
    var reducedObject = {};
    for (var key in columns) {
        reducedObject[columns[key]] = object[columns[key]];
    }
    return reducedObject;
}
