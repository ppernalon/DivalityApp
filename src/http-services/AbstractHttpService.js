import axios from "axios";

export default class AbstractHttpService{
    static buildHeaders(){
       return {
        headers: {
            'content-Type': 'application/json',
        }
    }}
    static buildPath(){
        return 'http://localhost:5000' // physical device with reverse tcp:5000
        // return 'http://10.0.2.2:5000' // emulated device
    }
    static getHttp(URL) {
        return axios.get(this.buildPath() + URL);
    }
    static postHttp(URL, body){
        return axios.post(this.buildPath() + URL, body, this.buildHeaders );
    }
    static putHttp(URL, body){
        return axios.put(this.buildPath() + URL, body);
    }
    static deleteHttp(URL, body){
        return axios.delete(this.buildPath() + URL);
    }
}