import axios from "axios";
import useAuth from "../Auth/Store";
import { refreshToken } from "../Services/AuthService";


const apiClient = axios.create({

    baseURL :"https://auth-app-ecfg.onrender.com/api/v1",
    headers :{
        "Content-Type" : "application/json",
    },
    withCredentials :true,
    timeout:10000
})


apiClient.interceptors.request.use((config)=>{

    const accessToken = useAuth.getState().accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})


let isRefreshing = false;
let pending :any[] = [];

function queueRequest(cb:any){
    pending.push(cb);
}

function resolveQueue(newToken:string){
    pending.forEach((cb)=>cb(newToken))
    pending = [];
}

// response interceptors

apiClient.interceptors.response.use((response)=> response,
async (error)=>{
    console.log(error)
    const is401 = error.response.status === 401;
    const original = error.config;
    console.log("original retry : ",original._retry);
    if(!is401 || original._retry){
        return Promise.reject(error)
    }

    // we will try to refresh token 

    if(isRefreshing){
        console.log("already refreshing....")
        return new Promise((resolve,reject)=>{
            queueRequest((newToken:string)=>{
                if(!newToken) return reject();
                original.headers.authorization=`Bearer ${newToken}`
                resolve(apiClient(original))
            })
        });
    }

    isRefreshing = true;
    try {
        console.log("start refreshing....")
        const loginResponse = await refreshToken();
        const newToken = loginResponse.accessToken;
        if(!newToken) throw new Error("no access token recieved");
        useAuth.getState().checkLocalLoginData(loginResponse.accessToken, loginResponse.user,true);

        resolveQueue(newToken)
        original.headers.authorization = `Bearer ${newToken}`
        return apiClient(original);

    } catch (error) {
        resolveQueue("null")
        useAuth.getState().logout;
        return Promise.reject(error)

    }finally{
        isRefreshing= false
    }

    
})

export default apiClient;

