import Leads_list from "@/pages/components/leads_list";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import Header from "@/pages/components/Header";
export default function Leads(){
    const [leadDetails, setLeadDetails]=useState({
        first_name:"",
        middle_name:"",
        last_name:"",
        location:"",
        phone:""
    })
    const[gender, setGender]=useState("")
    const[leads, setLeads]=useState<any[]>([])
    //Onchange event when the user is typing
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeadDetails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }
    //Onchange event when the user selects the gender
    const handleSelect = async (event:any)=>{
       await setGender(event.target.value)
    }

    //Submit lead details
    const handleSubmitLead = async (event:any)=>{
        event.preventDefault()
        const saveLead = await axios.post(buildAPIUrl('create_new_lead'), {
            first_name:leadDetails.first_name,
            middle_name:leadDetails.middle_name,
            last_name:leadDetails.last_name,
            location:leadDetails.location,
            gender:gender,
            user_id:1,
            phone:leadDetails.phone
        })
        if (saveLead.status===200){
            //display a success message when a lead is created
            toast.success("Lead created successfully");
            setLeadDetails({
                first_name:"",
                middle_name:"",
                last_name:"",
                location:"",
                phone:""
            })
            setGender("")
            getLeads()
        } else {
            toast.error("An error occurred!!!")
        }

    }
    //Get the leads list for each user
    const getLeads = async ()=>{
        const leadsList = await axios.get(buildAPIUrl('get_leads/1/1'))
        setLeads(leadsList.data)
    }
    useEffect(()=>{
        getLeads()
    }, [])
    return (
        <>
            <Header type={"user"} />
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

            <div className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <div className={"card create-form"}>
                            <div className={"card-body"}>
                                <h5>Create Lead</h5>
                                <hr />
                                <form onSubmit={handleSubmitLead}>
                                    <div className={"mb-3"}>
                                        <label>First Name</label>
                                        <input type={"text"} onChange={handleInput} name={"first_name"} className={"form-control"} required={true} value={leadDetails.first_name} />
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Middle Name</label>
                                        <input type={"text"} onChange={handleInput} name={"middle_name"} className={"form-control"}  required={true}  value={leadDetails.middle_name}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Last Name</label>
                                        <input type={"text"} onChange={handleInput} name={"last_name"} className={"form-control"}  required={true} value={leadDetails.last_name} />
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Phone</label>
                                        <input type={"text"} onChange={handleInput} name={"phone"} className={"form-control"}  required={true} value={leadDetails.phone} />
                                    </div>
                                    {/* Can be extended to get the list of locations from an api.*/}
                                    <div className={"mb-3"}>
                                        <label>Location</label>
                                        <input type={"text"} onChange={handleInput} name={"location"} className={"form-control"}  required={true} value={leadDetails.location} />
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Gender</label>
                                        <select className={"form-control"} onChange={handleSelect} name={"gender"}  required={true}>
                                            <option>---Please select your gender----</option>
                                            <option value={"Female"}>Female</option>
                                            <option value={"Male"}>Male</option>
                                        </select>
                                    </div>
                                    <div className={"mb-3 container-fluid p-0 d-flex justify-content-end"}>
                                        <button className={"btn btn-success"}> + Create Lead</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className={"col-md-8"}>
                        <Leads_list type={"user"} leads={leads} />
                    </div>
                </div>
            </div>

        </>
    )
}