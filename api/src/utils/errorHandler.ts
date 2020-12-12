import ApplicationError from '../helpers/error';

class ErrorHandler {
    public static async handleError(error: Error): Promise<void> {
        
        // todo: add calls to logger

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(() => {console.log(error)});
            }, 1000);
        })
    }

    public static isOperationalError(error: Error): boolean {
        return (error instanceof ApplicationError) ? true : false;
    }
}

export default ErrorHandler;