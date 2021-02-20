type DatabaseError = {
    error: Error;
    params: {
        [key in string]?: string;
    }
}

export default DatabaseError;