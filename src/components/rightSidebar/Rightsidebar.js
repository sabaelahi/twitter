import React, {useEffect, useState} from 'react';
import '../layout/style.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {getHashTags} from "../../api/api_tweet";
import {setHashtagsTweet, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const Rightsidebar = () => {
    const {t} = useTranslation();
    const dispatch = useTweetDispatch();
    const statehastags = useTweetState();
    useEffect(() => {
        getHashTags((isOk, data) => {
            console.log(data)
            if (!isOk)
                return toast.error(t("error.hashTagFetch"));
            setHashtagsTweet(dispatch , data);
        })
    }, [])
    return (
        <div className="vh-100 p-4 scroll-right">
            <Link to={"/"} className={"d-flex flex-wrap "}>
                <img src="/images/twiiter.png" alt="لگوی توتیتر" className={"img-fluid tweet-logo"}/>
                <h4 className={"mr-3 my-auto text-primary"}> {t("appName")}</h4>
            </Link>
            <h6 className={"mt-5 font-weight-bold"}> {t("hashTagTitle")}</h6>
            <ul className={"list-unstyled p-0 mt-3 "}>
                {
                    statehastags.hashTags.map(item => {
                        return (
                            <li className={"mb-2"}>
                                <Link to={`/hashtags/${item.text}`}>
                                    <img src="/images/hashtag.png" alt="" width="40"
                                         className={"img-fluid border p-1 rounded"}/>
                                    <span className={"mr-3 font-16  font-weight-bold"}>{item.text}</span>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
};
export default Rightsidebar;