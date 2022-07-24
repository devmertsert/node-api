module.exports.handleErrors = (error) => {

    if(error.name === "endpointDoesNotExist") {
        return {
            code: 404,
            status: 'error',
            message: "Endpoint doesn't exist",
            errors: []
        }
    }

    if(error.name === "expressValidationError") {
        let errors = error.errors;
        const extractedErrors = [];
        error.array().map((err) => extractedErrors.push({
            key: err.param,
            value: err.msg === "Invalid value" ? "Please enter a valid " + err.param : err.msg
        }));

        return {
            code: 422,
            status: 'error',
            message: 'Express Validation Error',
            errors: extractedErrors
        }
    }

    if(error.name === "ValidationError") {
        let errors = error.errors;
        const extractedErrors = [];
        Object.keys(errors).map(val => extractedErrors.push({
            key: val,
            value: errors[val].message
        }));

        return {
            code: 422,
            status: 'error',
            message: 'Validation Error',
            errors: extractedErrors
        }
    }

    return {
        code: (error.code > 500 || error.code < 200) ? 500 : error.code,
        status: 'error',
        message: error.message,
        errors: error.errors || []
    }

    return true;
}