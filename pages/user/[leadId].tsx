import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import Header from "@/pages/components/Header";
import {toast, ToastContainer} from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function LeadId(){
    const [selectedImage, setSelectedImage] = useState(null);
    const[activeButton, setActiveButton]=useState(false)
    const[annualIncomeError, setAnnualIncomeError]=useState("")
    const[annualIncome, setAnnualIncome]=useState("")
    const[productID, setProductID]=useState("")
    const[leadID, setLeadID]=useState<any>("")
    const[customerProducts, setCustomerProducts]=useState<any[]>([])
    const router = useRouter()
    const [leadDetails, setLeadDetails]=useState<any[]>([])
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const [products, setProducts]=useState<any[]>([])
    const handleInput = (event)=>{
        setAnnualIncome(event.target.value)
    }
    //Show add product modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //Get the list of products
    const getProducts = async () => {
        const products = await axios.get(buildAPIUrl('list_of_products'))
        setProducts(products.data)
    }

    //Check if the customer is making enough to have the product
    const handleSelectProduct = async (event:any)=>{
        const getProductMinimumIncome = await axios.get(buildAPIUrl(`product_details/${event.target.value}`))
        //Check if the user is within acceptable income levels
        if (getProductMinimumIncome.data.minimum_income <= annualIncome){
            //Allow the user to assign the customer the product
            setActiveButton(true)
            setAnnualIncomeError("")
            setProductID(event.target.value)
        } else {
            setActiveButton(false)
            setAnnualIncomeError("This customer does not make enough to have this product")
            //Display the error message for 5 minutes
            setTimeout(()=>{
                setAnnualIncomeError("")
            }, 5000)
        }
    }
    const handleSubmitCustomer = async (event:any)=>{
        const formData = new FormData();
        formData.append('photo', selectedImage);
        formData.append('annual_income',annualIncome )
        formData.append('user_id', "1")
        formData.append("lead_id", leadDetails.id)
        const submitCustomer = await axios.post(buildAPIUrl('save-customer'), {
            body:formData
        })
        if(submitCustomer.status===200){
            toast.success("Customer added successfully")
        } else {
            toast.error("An error occurred!!")
        }
    }

    const saveCustomerProduct = async (event:any)=>{
        const save = await axios.post(buildAPIUrl('save-customer-product'), {
            lead_id:leadID,
            product_id:productID
        })
        if (save.status === 200) {
            toast.success("Customer assigned the product successfully")
        } else {
            toast.error("An error occurred!!!")
        }
    }

    const getCustomerProducts = async ()=>{
        const customerProducts =await axios.get(buildAPIUrl(`get_customer_product/1`))
        setCustomerProducts(customerProducts.data)
    }

    useEffect(()=>{
        if (router.isReady){
            const {leadId} = router.query;
            setLeadID(leadId)
            const getLeadDetails = async ()=>{
                const leadDetails = await axios.get(buildAPIUrl(`lead_details/${leadId}`))
                setLeadDetails(leadDetails.data)
            }
            getLeadDetails()
            getCustomerProducts()
        }
        getProducts()
    },[router.isReady])

    return (
        <>
            <Header type={"user"} />
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={saveCustomerProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        annualIncomeError.length > 0 ?    <p className={"alert alert-danger"}>
                            {
                                annualIncomeError
                            }
                        </p> : <></>
                    }


                        <div className={"mb-3"}>
                            <select className={"form-control"} name={"product"} onChange={handleSelectProduct}>
                                <option>Please select a product</option>
                                {
                                    products.length > 0 ? <>
                                        {
                                            products.map((product)=>(
                                                <option value={product.id} key={product.id}>{product.product_name}</option>
                                            ))
                                        }
                                    </> : <></>
                                }
                            </select>
                        </div>
                        <div className={"mb-3"}>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCustomerProduct}  disabled={!activeButton}>
                        Save
                    </Button>
                </Modal.Footer>
                </form>
            </Modal>
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
                    <div className={"col-md-12 border p-3 bg-light"}>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <h6>
                                    Name: {leadDetails.first_name} {leadDetails.middle_name} {leadDetails.last_name}
                                </h6>
                                <h6>
                                    Phone: {leadDetails.phone}
                                </h6>
                                <h6>
                                    Location: {leadDetails.location}
                                </h6>
                            </div>
                            <div className={"col-md-4"}>
                                    <h6>Gender: {leadDetails.gender}</h6>
                                    <h6>Date Created: {new Date(leadDetails.created_at).toDateString()}</h6>

                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6 mt-5"}>
                        <form onSubmit={handleSubmitCustomer}>
                            <div className={"card"}>
                                <div className={"card-body"}>
                                    <h5>  Convert to customer</h5>
                                    <hr />
                                    <div className={"mb-3"}>
                                        <label>Photo</label>
                                        <input type={"file"}   accept="image/*" onChange={handleImageChange} name={"photo"} className={"form-control"}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Annual earning</label>
                                        <input onChange={handleInput} type={"text"} name={"annual_earning"} className={"form-control"}/>
                                    </div>
                                    {
                                        annualIncome.length > 0 && annualIncome >= 10000 ? <>
                                        <h6 onClick={handleShow} style={{cursor:"pointer"}}>Add products</h6>
                                        </> : <></>
                                    }
                                    <div className={"container-fluid mb-3 d-flex justify-content-end"}>
                                        <button className={"btn btn-success"} disabled={!annualIncome.length > 0 }> Next</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}