import React from "react";
import Tweet from "./Tweet";

const TweetList = ({data}) =>{
    return(
        <>
            {data.map(item => <Tweet  data={item}/>)}
        </>
    )
};
export  default TweetList;