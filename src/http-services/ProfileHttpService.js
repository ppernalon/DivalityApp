import AbstractHttpService from "./AbstractHttpService";
import constants from "../constants"

export default class ProfileHttpService extends AbstractHttpService{
    static changePassword(passwordForm) {
        const passwordObject = {
            password: passwordForm.password,
        }
        return this.putHttp(constants.API_UPDATE_PASSWORD, passwordObject)      
    }
}
