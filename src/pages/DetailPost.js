import React from "react";
import {Link} from "react-router-dom";

const DetailPost = (props)=>{
    return(
        <div>
            <h1>post {props.match.params.mid}</h1>
            <Link to={"/posts"}>back</Link>
        </div>
    )
}

export default DetailPost;