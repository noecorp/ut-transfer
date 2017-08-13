import { validationTypes, textValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export const getConfirmTransferPopupValidations = () => {
    return [
        validations.password,
        validations.otp
    ];
};

export const validations = {
    password: {
        key: ['password'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Password is required</Text> }
        ]
    },
    otp: {
        key: ['otp'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>OTP is required</Text> },
            { type: textValidations.numberOnly, errorMessage: <Text>OTP must contain only numbers</Text> },
            { type: textValidations.length, minVal: 6, maxVal: 6, errorMessage: <Text>OTP must be 6 characters long</Text> }
        ]
    }
};
