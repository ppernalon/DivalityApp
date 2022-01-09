import axios from "axios";

export default class AbstractHttpService{
    static buildHeaders(){
       return {
        headers: {
            'content-Type': 'application/json',
        }
    }}
    static buildPath(){
        return 'http://paul-pernalon.fr:5000'
    }
    static getHttp(URL) {
        console.log(this.buildPath() + URL)
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