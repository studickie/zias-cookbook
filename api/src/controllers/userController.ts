import * as DbContext from '../database/connection';

export async function findUsers () {
    const response = await DbContext.findCollection('users');

    // TODO: logic here to format objects into front-end DTO

    return response;
}

export async function findUser (fieldName: string, fieldValue: string) {
    const response = await DbContext.findInCollection('users', fieldName, fieldValue);

    // TODO: logic here to format objects into front-end DTO

    return response;
}

// export async function createUser () {
    
// }