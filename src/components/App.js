import React from 'react';
import Layout from "./layout/Layout";
import {BrowserRouter, Route , Switch , Redirect} from "react-router-dom";
import Home from "../pages/Home/Home";
import Post from "../pages/Posts";
import DetailPost from "../pages/DetailPost";
import Coursers from "../pages/Coursers";
import Page404 from "../pages/Page404";
import TweetsByHashtag from "../pages/tweetsByHashtag/TweetsByHashtag";
import TweetByUser from "../pages/tweetByUser/TweetByUser";
import AuthPage from "../pages/auth/AuthPage";
import {ToastContainer} from 'react-toastify';
import {render} from "@testing-library/react";
import {TweetProvider} from "../context/TweetContext";
import '../i18n'


const App = () =>{
    return(
        <div className={"vh-100 overflow-hidden"}>
        <BrowserRouter>
            <Switch>
            <PublicRoute path ={"/login"} component={AuthPage}/>
            <PrivateRoute path={"/"} render={()=>
                <TweetProvider>
                 <Layout>
                    <Switch>
                        <Route  exact path={"/"} component={Home}/>
                        <Route exact path={"/hashtags/:hashtag"} component={TweetsByHashtag}/>
                        <Route exact path={"/users/:name/:id"} component={TweetByUser}/>
                        <Route component={Page404}></Route>
                    </Switch>
                 </Layout>
                </TweetProvider>
            }/>
            </Switch>
        </BrowserRouter>
            <ToastContainer
                autoClose={2000}/>
        </div>
    );
}
const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({component , ...props}) =>{
    return <Route {...props} render={
        (props)=>{
            if(isLogin()){
                return <Redirect to={"/"}/>
            }else{
                return React.createElement(component, props);
            }
        }}
    />
}

const PrivateRoute = ({render, ...props}) => {
    return <Route {...props} render={
            (props)=>{
                if(isLogin()){
                  return render(props)
                }else {
                    return <Redirect to={"/login"}/>
                }
            }
        }
    />
}


export default App;
