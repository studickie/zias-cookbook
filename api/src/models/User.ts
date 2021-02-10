export enum UserActiveStatus {
    unverified = 0,
    active,
    disabled
}

export default interface User {
    _id: string;
    email: string;
    hash: string;
    dateCreated: string;
    lastUpdated: string;
    active: UserActiveStatus
}