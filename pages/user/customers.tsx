import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import React, {useEffect, useState} from "react";
import Leads_list from "@/pages/components/leads_list";
import Header from "@/pages/components/Header";

export default function Customers() {
    const [leads, setLeads]=useState<any[]>([])
    //Get the leads list that have not been converted to customers
    const getLeads = async ()=>{
        const leadsList = await axios.get(buildAPIUrl('get_leads/1/2'))
        setLeads(leadsList.data)
    }
    useEffect(()=>{
        getLeads()
    }, [])
    return (
        <>
            <Header type={"user"} />
            <div className={"container stats mt-5"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>10</h5>
                            <p>My Leads</p>
                        </div>
                    </div>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>2</h5>
                            <p>Converted</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Leads_list type={"customer"} leads={leads} />
                    </div>
                </div>
            </div>
        </>
    )
}