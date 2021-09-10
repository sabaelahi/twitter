import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import TweetList from "../Home/components/TweetList";
import axios from "axios";
import {getAllTweets, getTweetByHshtagsRequest, getTweetsByHashTagRequest} from "../../api/api_tweet";
import {toast} from "react-toastify";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {useLocation} from "react-router-dom";



const TweetsByHashtag = (props) =>{
    const Location = useLocation();
    const {tweetList} = useTweetState();
    const tweetDispatch = useTweetDispatch();

    useEffect(() => {
        getTweetsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            setTweetList(tweetDispatch, data);
        })
    }, [Location]);
    return(
        <>
            <Header title={props.match.params.hashtag} icon={"fa-hashtag"}/>
            <TweetList data={tweetList}/>
        </>
    )
};


export default TweetsByHashtag;