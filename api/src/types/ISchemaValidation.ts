export default interface ISchemaValidation<T> {
    validateSchema: (data: T) => unknown | null;
}