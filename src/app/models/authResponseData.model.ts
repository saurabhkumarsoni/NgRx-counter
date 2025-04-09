export interface AuthResponseData {
    idToken: string,
    kind: string,
    localId: string,
    displayName: string,
    email: string,
    registered?: boolean,
    refreshToken: string,
    expiresIn: string,
    firstName: string,
    lastName: string,
}