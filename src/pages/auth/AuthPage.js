import React, {useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {loginApi, LoginApi, registerApi} from "../../api/api_auth";
import {toast} from "react-toastify";

const MyComponent = () => {
    const [key, setKey] = useState('Login');
    const [usernameLogin , setUsernameLogin] = useState('');
    const [passwordLogin , setpasswordLogin] = useState('');


    //register state
    const [fullNameRegister, setFullNameRegister] = useState();
    const [usernameRegister, setUsernameRegister] = useState();
    const [passwordRegister, setPasswordRegister] = useState();
    const [confPasswordRegister, setConfPasswordRegister] = useState();

    const validateLogin = (user) => {
        if(!user.username)
            return "نام کاربری خود را وارد نمایید "
        if(!user.password)
            return  "پسورد خود را وارد نمایید"
    };
    const validateRegister = (user) => {
        if (!user.username)
            return "نام خود راوارد نمایید";
        if (!user.name)
            return "نام کاربری خود راوارد نمایید";
        if (!user.password)
            return "پسورد خودرا وارد نمایید";
        if (user.password !== user.confPasswordRegister)
            return "پسورد خودرا صحیح وارد نمایید"
    };
    const handleRegister = (e)=>{
        e.preventDefault();
        const user ={
            name: fullNameRegister,
            username: usernameRegister,
            password: passwordRegister,
            confPasswordRegister: confPasswordRegister,
        }
        const error  = validateRegister(user);
        user.confPasswordRegister = undefined;
        if(error)
            return toast.warn(error)
        registerApi(user , (isOk , data)=>{
            if(!isOk)
                return toast.error(data)
            toast.success("ثبت نام شما با مو فقیت انجام شد ")
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
        })

    }
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: usernameLogin,
            password: passwordLogin
        };
        const error = validateLogin(user);
        if (error)
            return toast.warn(error);
        loginApi(user, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            else {
                console.log(data)
            }
            toast.success("ورود با موفقیت بود");
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            window.location.reload();
        })
    };
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className="col-4"></div>
                <div className={"col-4"}>
                    <div className={" mt-5 p-3 border"}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}>
                            <Tab eventKey="Login" title="ورورد">
                                <form action="" >
                                    <div className="form-group">
                                        <label className={"col-form-label"}>نام کاربری</label>
                                        <input type="text" className={"form-control"} name="username" value={usernameLogin} onChange={(e)=> setUsernameLogin(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className={"col-form-label"}>Password</label>
                                        <input type="text" className={"form-control"} name="password" value={passwordLogin} onChange={(e)=> setpasswordLogin(e.target.value)}/>
                                    </div>
                                    <div className={"d-flex flex-row-reverse"}>
                                        <button className={"btn btn-primary"} onClick={handleLogin}>ورود</button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab eventKey="Sign-in" title="عضویت">
                                <form action="" >
                                    <div className="form-group">
                                        <label className={"col-form-label"}>نام</label>
                                        <input type="text" className={"form-control"} name="name" value={fullNameRegister} onChange={e=> setFullNameRegister(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className={"col-form-label"}>نام کاربری</label>
                                        <input type="text" className={"form-control"} name="username" value={usernameRegister} onChange={e=> setUsernameRegister(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className={"col-form-label"}>پسورد</label>
                                        <input type="text" className={"form-control"} name="password" value={passwordRegister} onChange={e=> setPasswordRegister(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className={"col-form-label"}>تکرار پسورد</label>
                                        <input type="text" className={"form-control"} name="password" value={confPasswordRegister} onChange={e=> setConfPasswordRegister(e.target.value)}/>
                                    </div>
                                    <div className={"d-flex flex-row-reverse"}>
                                        <button className={"btn btn-primary"} onClick={handleRegister}>عضویت</button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
