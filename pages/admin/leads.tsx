import Leads_list from "@/pages/components/leads_list";

export default function Leads(){
    return (
        <>
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
            <Leads_list type={"user"} />
        </>
    )
}