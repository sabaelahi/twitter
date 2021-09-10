import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import TweetList from "../Home/components/TweetList";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {getTweetsByUserRequest} from "../../api/api_tweet";
import {useLocation} from "react-router-dom";


const TweetByUser = (props) =>{
    const {tweetList} = useTweetState();
    const Location = useLocation();
    const dispatch = useTweetDispatch();
    useEffect(()=>{
        getTweetsByUserRequest(props.match.params.id,(isOk,data)=>{
            if(!isOk)
                return alert("Error")
                setTweetList(dispatch , data);
        })
    },[Location]);
    return(
        <>
            <Header title={props.match.params.name} icon={"fa-user"}/>
            {tweetList.length ?  <TweetList data={tweetList}/> : <h3 className={"text-center mt-5"}>این کاربرتا به حال توییتی نداشته!</h3>}

        </>
    )
};


export default TweetByUser;