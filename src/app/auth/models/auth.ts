export interface SignInInfo {
    userName: string,
    password: string,
}
export interface AuthRes {
    token: string,
    userName: string,
    name: string
}
export interface AuthData {
    userInfo: AuthRes;
    loggedIn: boolean;
  }