import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Menu from './Menu';
import Navabar from './Navbar';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                {/* <div className="Cart-header">

                    <div className="Cart-title"> <h3>You Have {`${items.length}`} Items In Your Cart</h3></div>
                </div> */}


                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <div>
            <Menu />
            <Navabar />

            <div className="productCart">

                <div className="productCart-row">
                    <dssiv className="">{items.length > 0 ? showItems(items) : noItemsMessage()}</dssiv>

                    <div className="mt-5">

                        <Checkout products={items} setRun={setRun} run={run} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;