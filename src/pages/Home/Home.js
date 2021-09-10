import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import NewTweet from "./components/NewTweet";
import TweetList from "./components/TweetList";
import axios from "axios";
import {getAllTweets} from "../../api/api_tweet";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
const Home = () =>{
    const{tweetList} = useTweetState();
    const dispatch = useTweetDispatch();
    const {t} = useTranslation();
   const [tweets,setTweets]=useState([]);
   useEffect(()=>{
       updateTweet()
   },[])

    const updateTweet =()=>{
        getAllTweets((isOk , data)=>{
            if(!isOk)
                return toast.error(t("error.tweetFetch"));
                setTweetList(dispatch,data);
        })
    }
    return(
        <>
            <Header title={t("home")} icon={"fa-home"}/>
            <NewTweet updateTweet={updateTweet}/>
            <TweetList data={tweetList}/>
        </>
    )
};

export default Home;