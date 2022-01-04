import axios from "axios";

export default class AbstractHttpService{
    static buildPath(){
        return 'https://localhost:5001'
    }
    static getHttp(URL) {
        return axios.get(this.buildPath() + URL);
    }
    static postHttp(URL, body){
        return axios.post(this.buildPath() + URL, body);
    }
    static putHttp(URL, body){
        return axios.put(this.buildPath() + URL, body);
    }
    static deleteHttp(URL, body){
        return axios.delete(this.buildPath() + URL);
    }
}