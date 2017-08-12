import immutable from 'immutable';
// make errors like key value pairs
export function prepareErrors(errors, currentErrors = {}) {
    let result = currentErrors;
    errors.forEach((error) => {
        if (error.key) {
            let errorKey = error.key[error.key.length - 1]; // only last key
            result[errorKey] = error.errorMessage;
        }
    });

    return result;
};

export function prepareErrorsWithFullKeyPath(errors) {
    let result = immutable.fromJS({});
    errors.forEach((error) => {
        if (error.key) {
            result = result.setIn(error.key, error.errorMessage);
        }
    });

    return result;
};
