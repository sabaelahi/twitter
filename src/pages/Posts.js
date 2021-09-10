import React from "react";
import {Link} from "react-router-dom";

const Posts = ()=>{
    return(
        <div>
            <h1>لیست پست ها </h1>
            <div>
                <p>1پست شماره </p>
                <Link to={"/posts/1"}>مشاهده جزییات</Link>
            </div>
            <div>
                <p>2پست شماره </p>
                <Link to={"/posts/2"}>مشاهده جزییات</Link>
            </div>
        </div>
    )
};
export default Posts;