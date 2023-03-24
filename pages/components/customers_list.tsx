export default function Customers_list(){
    return (
        <>
            <div className={"container leads mt-5 border p-3"}>
                <h6>Customers</h6>
                <table className={"w-100 mt-3 "}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Annual Earning</th>
                        <th>Products</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Phone Number</td>
                        <td>Location</td>
                        <td>Creation Date</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </>
    )
}