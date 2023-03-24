
import Leads_list from "@/pages/components/leads_list";
import Header from "@/pages/components/Header";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import {useEffect, useState} from "react";

export default function Admin() {
    const [leads, setLeads]=useState<any[]>([])
    const getLeads = async ()=>{
        const leadsList = await axios.get(buildAPIUrl('admin_get_leads'))
        setLeads(leadsList.data)
    }
    useEffect(()=>{
        getLeads()
    }, [])
    return (
        <>
           <Header />
            <div className={"container stats mt-5"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>10</h5>
                            <p>Users</p>
                        </div>
                    </div>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>2</h5>
                            <p>Products</p>
                        </div>
                    </div>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>10</h5>
                            <p>Leads</p>
                        </div>
                    </div>
                    <div className={"col-md-3"}>
                        <div className={"card p-3"}>
                            <h5>10</h5>
                            <p>Customers</p>
                        </div>
                    </div>
                </div>
            </div>
            <Leads_list leads={leads} />
        </>
    )
}