export default function Leads_list(props){
    return (
        <div className={"container leads border p-3"}>
           <div className={"row"}>
               <div className={"col-md-8"}>
                   <h6>LEADS</h6>
               </div>
           </div>
            <table className={"w-100 mt-3 "}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Location</th>
                    <th>Creation Date</th>
                    <th>Created By</th>
                    {props.type==="customer"  ? <>
                    <th>Options</th>
                    </> : <></>}
                </tr>
                </thead>
                <tbody>
                {
                    props.leads.length > 0 ? <>
                        {
                            props.leads.map((lead)=>(
                                <tr key={lead.id}>
                                    <td>{lead.first_name} {lead.middle_name} {lead.last_name}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.location}</td>
                                    <td>{new Date(lead.created_at).toDateString()}</td>
                                    <td>{lead.user.name}</td>
                                    {props.type==="customer"  ? <>
                                        <td><a href={`/user/${lead.id}`}>View lead</a> </td>
                                    </> : <></>}
                                </tr>
                            ))
                        }
                    </> : <>
                    <tr>
                        <td colSpan={5}>
                            No leads created yet!
                        </td>
                    </tr>
                    </>
                }

                </tbody>

            </table>
        </div>
    )
}