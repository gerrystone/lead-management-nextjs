import axios from "axios";
import buildAPIUrl from "./UrlBuilder";
type serviceProps = {
    url:string,
    data:any
}


export default class ApiService{
    _setAuthHeader(){
        const token=localStorage.getItem("auth_token");
        return {Authorization:`Bearer ${token}`};
    }

    async makeGetCall(fn: serviceProps,needsAuth=true){
        if(needsAuth){
            return await axios.get(buildAPIUrl(fn.url),{headers:this._setAuthHeader()});
        }
        return await axios.get(buildAPIUrl(fn.url))
    }

    async makePostCall(url:string,data: any,needsAuth=true){
        if (needsAuth) {
            return await axios.post(buildAPIUrl(url), data,{headers: this._setAuthHeader()});
        }
        return await axios.post(buildAPIUrl(url),data)
    }

    async makePutCall(url:string,data:any,needsAuth=true){
        if (needsAuth) {
            return await axios.put(buildAPIUrl(url), data,{headers: this._setAuthHeader()});
        }
        return await axios.put(buildAPIUrl(url),data)
    }

    async makeDeleteCall(url:string,data: any,needsAuth=true){
        if (needsAuth) {
            return await axios.delete(buildAPIUrl(url), {headers: this._setAuthHeader()});
        }
        return await axios.delete(buildAPIUrl(url))
    }
}
