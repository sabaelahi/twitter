import axios from "axios";

export const getAxiosInstanceJson = ()=>{
    return axios.create({
        baseURL  :"http://localhost:3000",
        // headers:{
        //     API_KEY : "cdsdcsdsdcsdsdcsdcsdcs"
        // }
    })
}

export const getAxiosInstanceAuth = ()=>{
    return axios.create({
        baseURL  :"https://twitterapi.liara.run/api/",
        // headers:{
        //     API_KEY : "cdsdcsdsdcsdsdcsdcsdcs"
        // }
    })
}
export const getAxiosInstanceApi = ()=>{
    return axios.create({
        baseURL  :"https://twitterapi.liara.run/api/",
        headers:{
            'x-auth-token' : localStorage.getItem("x-auth-token")
        }
    })
}


