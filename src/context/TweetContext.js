import React from "react";
import {getHashTags} from "../api/api_tweet";

var TweetStateContext = React.createContext();
var TweetDispatchContext = React.createContext();

function tweetReducer(state, action) {
  switch (action.type) {
    case "NEW_TWEET":
     return {...state , tweetText : action.payload}
    case "TWEET_LIST":
      return {...state , tweetList : action.payload}
    case "SET_LIKE_TWEET":
      const tweetId = action.payload
      const foundIndex = state.tweetList.findIndex(item => item._id === tweetId);
      if(foundIndex === -1)
        return state;
      return {...state , tweetList : [...state.tweetList.slice(0,foundIndex) , {...state.tweetList[foundIndex] , likes : state.tweetList[foundIndex].likes + 1} , ...state.tweetList.slice(foundIndex+1)]}
    case "SET_HASHTAGS_TWEET":
      return {...state , hashTags : action.payload}
      default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({children}) {
  var [state, dispatch] = React.useReducer(tweetReducer, {
    tweetText : "",
    tweetList : [],
    hashTags : []
  });
  return (
    <TweetStateContext.Provider value={state}>
      <TweetDispatchContext.Provider value={dispatch}>
        {children}
      </TweetDispatchContext.Provider>
    </TweetStateContext.Provider>
  );
}

function useTweetState() {
  var context = React.useContext(TweetStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useTweetDispatch() {
  var context = React.useContext(TweetDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {TweetProvider, useTweetState, useTweetDispatch , setTweetText,setTweetList , setLikeTweet,setHashtagsTweet,updateHashtag};

// ###########################################################

function setTweetText(dispatch , tweetTex){
  dispatch({
    type: "NEW_TWEET",
    payload:tweetTex
  })
}
function setTweetList(dispatch , list){
  dispatch({
    type: "TWEET_LIST",
    payload:list
  })
}
function setLikeTweet(dispatch , id){
  dispatch({
    type: "SET_LIKE_TWEET",
    payload:id
  })
}
function setHashtagsTweet(dispatch , list){
  dispatch({
    type: "SET_HASHTAGS_TWEET",
    payload:list
  })
}

function updateHashtag(dispatch){
  getHashTags((isOk , data)=>{
    if(!isOk)
      return alert("error update hashtags")
    dispatch({
      type: "SET_HASHTAGS_TWEET",
      payload:data
    })
  })
}