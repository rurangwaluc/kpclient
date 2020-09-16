import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

const ProductInfo = (props) => {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    // const addToCarthandler = () => { 
    //     props.addToCart(props.detail._id)
    // }


    return (
        <div className="">

            <div className="main-content-header">
                <h2 >{Product.title}</h2>
                <p>Availability: <span>{Product.quantity} in stock</span> </p>

            </div>
            <div className="main-content-info-list">

                <p> <strong>Price</strong> : Rwf {Product.price}</p>

                <ul>

                    <li ><strong>Brand</strong> : {Product.brand}</li>
                    <li ><strong>Short Description</strong> : {Product.short_description}</li>
                </ul>
            </div>




        </div>
    )
}

export default ProductInfo
