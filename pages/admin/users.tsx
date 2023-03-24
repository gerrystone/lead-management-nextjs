import Header from "@/pages/components/Header";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import React, {useEffect, useState} from "react";
import {event} from "next/dist/build/output/log";
import {toast, ToastContainer} from "react-toastify";

export default function Users(){
    const [userDetails, setUserDetails]=useState({
        name:"",
        email:"",
    })
    const [usersList, setUserList]=useState<any[]>([])
    const [userType, setUserType]=useState("")
    //Onchange event when the user is typing
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
       setUserDetails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }
    const selectUserType= async (event:any)=>{
        await setUserType(event.target.value)
    }
    const handleSaveUser = async (event:any) =>{
        event.preventDefault()
        const saveUser = await axios.post(buildAPIUrl('create_new_user'), {
            name:userDetails.name,
            email:userDetails.email,
            user_type:userType
        })
        if(saveUser.status===200){
            toast.success("User Created Successfully")
            getUsersList()
            setUserDetails({
                name:"",
                email:"",
            })
            setUserType("")
        } else{
            toast.error("An Error occurred!")
        }
    }
    const getUsersList =async ()=>{
        const userslist = await axios.get(buildAPIUrl('users_list'))
        setUserList(userslist.data)
    }
    useEffect(()=>{
        getUsersList()
    }, [])
    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={"container leads mt-5 p-3"}>
                <h6>Users</h6>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <form onSubmit={handleSaveUser}>
                                    <div className={"mb-3"}>
                                        <label>Name</label>
                                        <input type={"text"} name={"name"} className={"form-control"} onChange={handleInput} value={userDetails.name}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Email</label>
                                        <input type={"email"} name={"email"} className={"form-control"} onChange={handleInput} value={userDetails.email}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>User Type</label>
                                        <select className={"form-control"} name={"user_type"} onChange={selectUserType}>
                                            <option>---Select user type---</option>
                                            <option value={"1"}>Creates leads</option>
                                            <option value={"2"}>Create Customer</option>
                                        </select>
                                    </div>
                                    <div className={"mb-3 p-0 container-fluid d-flex justify-content-end"}>
                                        <button className={"btn btn-success"}>
                                            + Add user
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-8 border p-3"}>
                        <table className={"w-100 mt-3 "}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Creation Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                usersList.length > 0 ? <>
                                    {
                                        usersList.map((user)=>(
                                            <>
                                                <tr key={user.id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.user_type===1 ? "Creates Leads" : "Creates customers"}</td>
                                                    <td>{new Date(user.created_at).toDateString()}</td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </> : <>
                                <tr>
                                    <td colSpan={4}>
                                        No users created yet
                                    </td>
                                </tr>
                                </>
                            }

                            </tbody>

                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}