import Header from "@/pages/components/Header";
import React, {useState} from "react";
import axios from "axios";
import buildAPIUrl from "@/Services/UrlBuilder";
import {toast, ToastContainer} from "react-toastify";

export default function Products(){
    const [productDetails, setProductDetails]=useState({
        product_name:"",
        minimum_income:""
    })
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }
    const handleSaveProduct = async (event:any)=>{
        event.preventDefault()
        const saveProduct = await axios.post(buildAPIUrl('add_product'), {
            product_name:productDetails.product_name,
            minimum_income:productDetails.minimum_income
        })
        console.log(saveProduct)
        if(saveProduct.status===200){
            toast.success("Product added successfully")
            setProductDetails({
                product_name:"",
                minimum_income:""
            })
        } else {
            toast.error("An error occurred!")
        }
    }
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
            <div className={"container mt-3"}>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <form onSubmit={handleSaveProduct}>
                            <div className={"card"}>
                                <div className={"card-body"}>
                                    <h5>Add Product</h5>
                                    <hr />
                                    <div className={"mb-3"}>
                                        <label>Product Name</label>
                                        <input onChange={handleInput} type={"text"} value={productDetails.product_name} name={"product_name"} className={"form-control"}/>
                                    </div>
                                    <div className={"mb-3"}>
                                        <label>Minimum Income</label>
                                        <input onChange={handleInput} value={productDetails.minimum_income} type={"text"} name={"minimum_income"} className={"form-control"}/>
                                    </div>
                                    <div className={"container-fluid p-0 d-flex justify-content-end mb-3"}>
                                        <button className={"btn btn-success"}>
                                            + Add Products
                                        </button>
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