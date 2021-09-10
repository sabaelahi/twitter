import React, {useEffect, useRef, useState} from 'react';
import '../layout/style.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {getUsers} from "../../api/api_tweet";
import {Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import {UploadImage, uploadUserPhoto} from "../../api/api_auth";
import {useTranslation} from "react-i18next";


const Leftsidebar = ()=>{
    const {t, i18n} = useTranslation();
    const [isOpen , setIsOpen] =useState(false);
    const [users , setUsers] = useState([]);
    const [imageFile , setImageFile] = useState();
    const[imagePath , setImagePath] = useState();
    const InputRef = useRef();
    const dropdownClick =(currentState) =>{
        setIsOpen((currentState)=> {
            return !currentState
        })
    }

    const handleChangeAvatar =(e)=>{
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0])

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            uploadUserPhoto(formData, (isOk, data) => {
                if (!isOk)
                    return toast.error(data);
                toast.success(t("success.uploadProfPic"))
                localStorage.setItem("image", data.imagePath);
            })
        }
    }

    const getImage =()=>{
        if(imagePath)
            return imagePath
        if(localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined'){
            return localStorage.getItem("image")
        }else {
            return "/images/emma.jpg"
        }

    }

    useEffect(()=>{
        getUsers((isOk,data)=>{

            if(!isOk) return toast.error(t("error.userFetchError"));
            setUsers(data);
        })
    },[])
    const changeLang = () => {
        if (i18n.language === "fa") {
            localStorage.setItem("lang", "en");
            i18n.changeLanguage("en");
        } else {
            localStorage.setItem("lang", "fa");
            i18n.changeLanguage("fa");
        }
    };
    return(
        <div className={"p-4"}>
            <div className={"d-flex flex-row-reverse flex-wrap align-items-center"}>
                <img src={getImage()} alt="عکس کاربر" className={" img-profile float-left"} />
                <div className={"float-left text-left ml-2"}>
                    <p className={"font-weight-bold font-18"}>{localStorage.getItem("name")}</p>
                    <p>{localStorage.getItem("name")}</p>
                    <input type="file" className={"d-none"} ref={InputRef} onChange={handleChangeAvatar} />
                    {/*start dropdown setting*/}
                    <div className="dropdown" onClick={dropdownClick}>
                        <button
                            className={"border-0 p-0"}
                            style={{background: "none"}}
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                        >{t("setting")}</button>
                        <div className={`dropdown-menu${isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item pointer" onClick={(e)=>{e.preventDefault();localStorage.clear();window.location.reload();}}>
                                {t("logoutMenu")}
                            </a>
                            <a className="dropdown-item pointer" onClick={() => {changeLang()}}>
                                {t("changeLangMenu")}
                            </a>
                            <a className={"dropdown-item pointer"} onClick={e => InputRef.current.click()} >
                                {t("editProfilePhotoMenu")}
                            </a>
                        </div>
                    </div>
                    {/*end dropdown setting*/}
                </div>
            </div>

            <div className={" mt-4 rounded-50 bg-light-2"}>
                <h5 className={"font-weight-bold px-4 py-4 m-0"}>{t("userListTitle")}</h5>
                <ul className={"list-unstyled p-0 scroll-left"} >
                      {/*start items reporters */}
                        {users.map((item,index)=> {
                                return (
                                    <Tweeter data={item}/>
                                )}
                            )}
                      {/*end items reporters */}
                </ul>
                <div style={{height : '50px'}}></div>
            </div>
        </div>
    )
};
export default Leftsidebar;


const Tweeter = ({data})=>{
    const getImage =()=>{
        if(data.image)
            return data.image
        else
            return '/images/emma.jpg'
    }
    return(
        <li className={"border-top py-3"}>
            <Link to={`/users/${data.name}/${data._id}`} className={"px-4 d-block"}>
                <div className={"d-flex align-items-center"}>
                    <div className="">
                        <img src={getImage()} alt="عکس کاربر" className={" img-profile2 m-0 p-0"}/>
                    </div>
                    <div className={"mr-3 ltr"}>
                        <p className={"font-weight-bold font-18 ltr text-left whiteSpace"}>{data.name}</p>
                        <p className={"ltr text-left whiteSpace"}>{data.username}</p>
                    </div>
                </div>
            </Link>
        </li>
    )
}