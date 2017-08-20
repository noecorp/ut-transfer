import React from 'react';
import { validationTypes, textValidations } from 'ut-front-react/validator/constants.js';
import Text from 'ut-front-react/components/Text';
import { customValidations } from '../../../containers/Transfer/Budget/validations';
import {isValidUniformCivilNumberRule} from 'ut-front-react/validator';

export const prepareTransferBudgetToSend = (data, auth) => {
    return {
        data: data.toJS(),
        auth
    };
};

export const prepareTemplateToCreate = (data) => {
    return {
        data: data.toJS()
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
            if (validation.type === validationTypes.text && rule.type === textValidations.uniformCivilNumber && data.get('liableEntityType') === 'person') {
                let result = {};
                isValidUniformCivilNumberRule(data.get('personalIdentifier') || '', rule, result);
                if (result.isValid === false) {
                    let err = result.errors[result.errors.length - 1];
                    err.key = validation.key;
                    validationResult.errors.push(err);
                }
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
    if (data.get('startDate') && data.get('endDate')) {
        let startDate = new Date(data.get('startDate'));
        let endDate = new Date(data.get('endDate'));
        if (startDate > endDate) {
            validationResult.isValid = false;
            validationResult.errors.push({
                key: ['endDate'],
                errorMessage: <Text>End date is before start date</Text>
            });
        }
    }
};
