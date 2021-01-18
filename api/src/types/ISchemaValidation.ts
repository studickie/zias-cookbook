interface ISchemaValidation<T> {
    validateSchema: (data: T) => unknown | undefined;
}

export default ISchemaValidation;