export const formatRuleItems = (items) => {
    let formattedPayload = {};

    items.map(item => {
        if (!formattedPayload[item.type]) {
            formattedPayload[item.type] = [];
        }
        formattedPayload[item.type].push({
            key: item.value,
            name: item.display
        });
    });

    return formattedPayload;
};


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
    if (data.get('transferExecution') === 'future' && !data.get('transferExecutionDate')) {
        validationResult.isValid = false;
        validationResult.errors.push({
            key: ['transferExecutionDate'],
            errorMessage: <Text>Transfer execution date is required</Text>
        });
    }
};