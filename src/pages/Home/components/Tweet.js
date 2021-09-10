import React from "react";
import {useTweetDispatch, setTweetText,setLikeTweet} from "../../../context/TweetContext";
import {likeTweetRequest} from "../../../api/api_tweet";
import {toast} from "react-toastify";

const Tweet= ({data})=>{
    const dispatch = useTweetDispatch();
    const getimage = ()=>{
        if(data.user.image)
            return data.user.image
        else
            return '/images/emma.jpg'
    }
    const renderTweet = (text)=>{
        return  {__html: text.replace(/#\S+/g,"<a href='/tags/$&' class='text-primary'>$&</a>")}

    }
    const handleRetweet = () => {
        setTweetText(dispatch , data.text)
    }
    const handleLike =()=>{
        likeTweetRequest(data._id ,(isOk ,data)=>{
            if(!isOk)
                return toast.error(data);
            setLikeTweet(dispatch , data._id);
        });
    }

    return(
        <>
            <div className={"p-4 tweets"}>
                <div className={"d-flex flex-row"}>
                    <div>
                        <img src={getimage()} alt="عکس کاربر" className={" img-profile2 m-0 p-0 flex-grow"}/>
                    </div>
                    <div className={"flex-grow-1 mr-3"}>
                        <p className={"ltr mb-3"}>
                            <span className={"text-light-2 mr-3 font-14"}>{data.user.id}</span>
                            <span className={" font-weight-bold font-18"}>{data.user.name}</span>
                        </p>
                        <p className={"w-100 min-height-200 text-justify"} dangerouslySetInnerHTML={renderTweet(data.text)}>
                        </p>
                        {
                            data.image &&
                            <div><img src={data.image} width={200}/></div>
                        }
                    </div>
                </div>
                <div className={"d-flex flex-row-reverse align-items-center"}>
                    <span onClick={handleRetweet}><a href="#"><i className={"fa fa-repeat text-dark fa-1x border rounded-pill p-2 mr-2"}></i></a></span>
                    <span onClick={handleLike}><a href="#"><i className={"fa fa-heart text-danger fa-1x border rounded-pill p-2"}></i></a></span>
                    <span className={"ml-2 pointer"} >{data.likes}</span>
                </div>
            </div>
            <hr className={"hr-7"}/>
        </>
    )
}

export default Tweet;