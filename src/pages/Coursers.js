import React from "react";
import {Link} from "react-router-dom";

const Coursers = (props) =>{
    const testRoute =()=>{
        props.history.push("/posts");
    }
    return(
        <div>
            Test Router
            <button onClick={testRoute}>posts</button>
            <br/>
            <Link to="/posts">test</Link>
        </div>
    )
}

export default Coursers;