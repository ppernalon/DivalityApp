import AbstractHttpService from "./AbstractHttpService";
import constants from "../constants"

export default class SignInHttpService extends AbstractHttpService{
    static signIn(signInForm) {
        const signInURL = '/' + signInForm.username +'/' + signInForm.password
        console.log(constants.API_SIGN_IN)
        return this.getHttp(constants.API_SIGN_IN + signInURL)
    }

}
