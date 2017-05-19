import { textValidations } from 'ut-front-react/validator/constants.js';

export function getBatchNameValidations() {
    return [
        {type: textValidations.isRequired, errorMessage: 'Please enter batch name'}
    ];
}
