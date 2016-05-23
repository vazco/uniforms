export default class Bridge {
    constructor (schema) {
        this.schema = schema;
    }

    // Check, if this bridge is compatibile with given schema
    static check (schema) {
        return (
            schema &&
            schema.getError &&
            schema.getErrorMessages &&
            schema.getField &&
            schema.getInitialValue &&
            schema.getProps &&
            schema.getSubfields &&
            schema.getType &&
            schema.getValidator
        );
    }

    // Field's scoped error
    getError (name, error) {
        return this.schema.getError(name, error);
    }

    // All error messages from error
    getErrorMessages (error) {
        return this.schema.getErrorMessages(error);
    }

    // Field's definition (`field` prop)
    getField (name) {
        return this.schema.getField(name);
    }

    // Field's initial value
    getInitialValue (name) {
        return this.schema.getInitialValue(name);
    }

    // Field's props
    getProps (name) {
        return this.schema.getProps(name);
    }

    // Field's subfields (or first-level fields)
    getSubfields (name) {
        return this.schema.getSubfields(name);
    }

    // Field's type (ex. Number, String)
    getType (name) {
        return this.schema.getType(name);
    }

    // Function with one argument - model - which throws errors
    // when model is invalid
    getValidator (options) {
        return this.schema.getValidator(options);
    }
}
