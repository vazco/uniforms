export default function validatorParam (schema, field, name) {
    const validators = schema.validators[field];
    if (!validators) {
        return null;
    }
    const validator = validators.find(validator => validator.type === name);
    return validator ? validator.param : null;
}
