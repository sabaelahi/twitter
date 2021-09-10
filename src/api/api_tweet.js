import {getAxiosInstanceApi, getAxiosInstanceJson} from "./api";

export const getAllTweets = (callback)=>{
    getAxiosInstanceApi().post("getAllTweet")
        .then(res=>{
            const data = res.data
            console.log(data)
            callback(true,data)
        })
        .catch(err=> {
            console.log(err);
            callback(false,err);
        });

}
export const getProfile = (callback)=>{
    getAxiosInstanceApi().get("getProfile")
        .then(res=>{
            const data = res.data
            console.log(data)
            callback(true,data)
        })
        .catch(err=> {
            console.log(err);
            callback(false,err);
        });

}
export const getHashTags = (callback) => {
    getAxiosInstanceApi().get("getAllHashTags")
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    })
};
export const getUsers = (callback)=>{
    getAxiosInstanceApi().get("getAllUser")
        .then(res=> {
            callback(true,res.data)
        })
        .catch(err=>{
            callback(false,err)
        })
}

export const newTweetRequest = (formData,callback)=>{
    getAxiosInstanceApi().post("newTweet",formData)
        .then(res=>{
            const data = res.data
            callback(true,data)
        })
        .catch(error=> {
            console.log(error)
            callback(false,error);
        });

}

export const getTweetsByHashTagRequest = (hashTag ,callback) => {
    getAxiosInstanceApi().post("getAllTweet" , {hashTag})
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    })
};
export const getTweetsByUserRequest = (user ,callback) => {
    getAxiosInstanceApi().post("getAllTweet" , {user})
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    })
};
export const likeTweetRequest = (id, callback) => {
    getAxiosInstanceApi().get("likeTweet/"+id)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};

