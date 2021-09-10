import React, {useEffect, useState} from 'react';
import Leftsidebar from "../leftSidebar/Leftsidebar";
import Rightsidebar from "../rightSidebar/Rightsidebar";
import {Scrollbar} from "react-scrollbars-custom";
import {getProfile} from "../../api/api_tweet";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Layout = (props)=>{
    const {t} = useTranslation();
    const {history} = useHistory();
    const [wait , setWait] = useState(true);
    useEffect(()=>{
        getProfile((isOk,data)=>{
            if(!isOk){
                return toast.error(data);
                localStorage.clear();
                history.push("/login");
            }
            setWait(false)
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);

        }   )
    },[])

    if(wait)
        return<div className={"vh-100 wh-100 d-flex flex-column justify-content-center align-items-center"}>
            <i className={'fa fa-spinner fa-spin fa-3x'}></i>
            <h3 className={"mt-2"}>{t("wait")}</h3>
            </div>
    else
    return(
        <div className={"container-fluid"}>
            <div className="row">
                <div className="col-2 border-left p-0">
                    <Rightsidebar/>
                </div>
                <div className="col-7 border-left p-0">
                    <Scrollbar>
                        <div className={"vh-100"}>
                            {props.children}
                        </div>
                    </Scrollbar>
                </div>
                <div className="col-3 p-0">
                    <Leftsidebar/>
                </div>
            </div>
        </div>
    )
};

export default Layout;