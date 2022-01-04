import AbstractHttpService from "./AbstractHttpService";
import constants from "../constants";

export default class SignUpHttpService extends AbstractHttpService{
    static signUp(signUpForm) {
        const signUpObject = {
            username: signUpForm.username,
            password: signUpForm.password,
        }
        return this.postHttp(constants.API_SIGN_UP, signUpObject)
    }

}
