import React, {useRef, useState} from "react";
import TextareaAutosize from "react-autosize-textarea";
import {newTweetRequest} from "../../../api/api_tweet";
import {toast} from "react-toastify";
import {setTweetText, updateHashtag, useTweetDispatch, useTweetState} from "../../../context/TweetContext";
import {useTranslation} from "react-i18next";


const NewTweet = ({updateTweet}) =>{
    const {t} = useTranslation();
   const {tweetText} = useTweetState();
   const TweetDispatch = useTweetDispatch();
    const [imageFile , setImageFile] = useState();
    const[imagePath , setImagePath] = useState();
    const imgeRef = useRef();
    const setnewtweet = (e)=>{
        setTweetText(TweetDispatch , e.target.value);
    }
    const handleImageTweet =(e)=>{
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0])

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const addTweet =(e)=>{
        const tweetTexts = tweetText;
        if(!tweetTexts)
            return;
        const formData = new FormData();
        formData.append("text", tweetTexts);
        if(imageFile)
            formData.append("image", imageFile);
        newTweetRequest(formData , (isOk,data)=>{
            if(!isOk)
               return toast.error(data);
            else
            toast.success(t("success.newTweet"));
            updateTweet();
            setTweetText(TweetDispatch ,"");
            setImagePath();
            setImageFile();
            if(tweetTexts.include("#"))
                updateHashtag(TweetDispatch);
        })
    };

    const getImage =()=>{
        if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
            return localStorage.getItem("image");
        else
            return '/images/emma.jpg'
    }

    return(
        <>
            <hr className={"m-0"}/>
            <div className={"p-4 add-new-tweet"}>
                <div className={"py-4 d-flex flex-row"}>
                    <div>
                        <img src={getImage()} alt="عکس کاربر" className={"img-profile2 m-0 p-0 flex-grow-1"}/>
                    </div>
                    <div className={"flex-grow-1 mr-3"}>
                        <TextareaAutosize rows={3} maxRows={15} placeholder={t("label.doTweet")} className={"textarea w-100"} value={tweetText} onChange={setnewtweet}/>
                        {
                            imagePath &&
                            <div><img src={imagePath} width={200}/></div>
                        }
                    </div>
                </div>
                <div className={"d-flex flex-row-reverse align-items-center"}>
                    <button className={"btn btn-info rounded-pill px-5 mr-3"} onClick={addTweet}>{t("btn.tweet")}</button>
                    <span onClick={e=>imgeRef.current.click()}><a href="#"><i className={"fa fa-image text-danger fa-1x border rounded-pill p-2"}></i></a></span>
                    <input type="file" ref={imgeRef} className={"d-none"} onChange={handleImageTweet}/>
                </div>
            </div>
            <hr className={"hr-7"}/>
        </>
    )
}

export default NewTweet;