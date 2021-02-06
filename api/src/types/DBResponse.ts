type DBResponse<T> = 
    | { 
        error: false,
        data: T | null
    }
    | {
        error: true
    };

export default DBResponse;