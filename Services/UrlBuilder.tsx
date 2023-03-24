export default function buildAPIUrl(resourcePath: string){
    let current = window.origin;
    if(current.includes("localhost:") || current.includes("127.0.0.1:")){
        return "http://localhost:8000/api/"+resourcePath;
    }else{
        return window.origin+"/api/"+resourcePath;
    }
}