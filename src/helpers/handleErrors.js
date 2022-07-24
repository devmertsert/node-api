module.exports.handleErrors = (error) => {

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
            error: extractedErrors
        }
    }

    return {
        code: (error.code > 500 || error.code < 200) ? 500 : error.code,
        status: 'error',
        message: error.message,
        error: error.errors || []
    }
}