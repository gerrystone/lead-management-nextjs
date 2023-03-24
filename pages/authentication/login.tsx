import React, {useState} from "react";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";

export default function Login() {
    const [userDetails, setUserDetails]=useState({
        password:"",
        email:"",
    })
    //Onchange event when the user is typing
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }
    const handleLogin = async (event:any) =>{
        const login = await axios.post(buildAPIUrl('login'), {
            email:userDetails.email,
            password:userDetails.password
        })
        localStorage.setItem('user_type', login.data.userType)
        if(login.data.userType===1){
            window.location.assign("/user/leads")
        } else if(login.data.user_type===1) {
            window.location.assign("/user/customers")
        }
    }
    const handleTestLog = async ()=>{
        console.log("clicked")
    }
    return (
        <>
            <div className={"container-fluid login-page"}>
                <div className={"container"}>
                    <div className={"row d-flex justify-content-center align-items-center"}>
                        <div className={"col-md-5 login-left-side d-flex justify-content-center align-items-center"}>
                            <img src="./Mobile-login.svg" alt={"login-mobile-image"} />

                        </div>
                        <div className={"col-md-5 login-right-side d-flex align-items-center"}>
                            <div className={"container px-5"}>
                                <h4 className={"text-center"}>Hello Again!</h4>
                                <p>Welcome back. Please enter your login details to access the dashboard</p>

                                    <div className={"mt-4 mb-3"}>
                                        <label>Email</label>
                                        <input type={"email"} required={true} onChange={handleInput} value={userDetails.email} name={"email"} className={"form-control"}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Password</label>
                                        <input type={"password"} onChange={handleInput} value={userDetails.password} required={true} name={"password"} className={"form-control"}/>
                                    </div>
                                    {/* Should direct users to the forgot password page*/}
                                    <h6 onClick={handleTestLog} style={{cursor:"pointer"}}>Forgot Password?</h6>
                                    <div className={"mt-3"}>
                                        <button className={"btn w-100 btn-success"} onClick={handleLogin}>Login</button>
                                    </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}