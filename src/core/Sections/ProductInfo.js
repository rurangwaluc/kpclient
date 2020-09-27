import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import moment from 'moment';

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
                <p >Added {moment(Product.createdAt).fromNow()}</p>
                <p>Rwf {Product.price}</p>

                <ul>

                    <li > {Product.brand}</li>
                    {/* <li > {Product.sold}</li> */}

                    <div className="mt-4">
                    <li > {Product.short_description}</li>

                    </div>
                </ul>
            </div>




        </div>
    )
}

export default ProductInfo
