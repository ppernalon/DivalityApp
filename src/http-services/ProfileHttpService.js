import AbstractHttpService from "./AbstractHttpService";
import constants from "../constants"

export default class ProfileHttpService extends AbstractHttpService{
    static changePassword(passwordForm, username) {
        const passwordObject = {
            oldPassword: passwordForm.oldPassword,
            newPassword: passwordForm.password,
            username: username
        }
        return this.postHttp(constants.API_UPDATE_PASSWORD, passwordObject)      
    }
}
