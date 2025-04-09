export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date,
  ) {

  }

  get expireDate(){
    return this.expirationDate;
}

get userToken(){
  return this.token;
}
}



export interface RegisterUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

