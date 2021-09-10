import React from "react";

const Header = ({title , icon})=>{
    return(
        <>
            <div className={"px-4 py-4 d-flex align-items-center"}>
                <i className={"fa"+ " " + icon + " " + "fa-2x"}></i>
                <p className={"mr-2 font-18 font-weight-bold"}>{title}</p>
            </div>
            <hr className={"m-0"}/>
        </>
    )
}
export default Header;