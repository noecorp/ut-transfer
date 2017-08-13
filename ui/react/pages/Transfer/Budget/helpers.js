import { customValidations } from '../../../containers/Transfer/Budget/validations';

export const prepareTransferBudgetToSend = (data, auth) => {
    return {
        data: data.toJS(),
        auth
    };
};

export const performCustomValidations = (data, validationResult) => {
    customValidations.forEach(validation => {
        let rules = validation.rules;
        rules.forEach(rule => {
            if (rule.isRequired && !data.getIn(validation.key)) {
                validationResult.isValid = false;
                validationResult.errors.push({
                    key: validation.key,
                    errorMessage: rule.errorMessage
                });
            }
        });
    });
};
