interface ISchemaValidation<T> {
    validateSchema: (data: T) => unknown | null;
}

export default ISchemaValidation;