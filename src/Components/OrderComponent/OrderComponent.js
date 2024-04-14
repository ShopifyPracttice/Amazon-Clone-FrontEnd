import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderStyledComponent = styled.div`
padding: 10px;
h1{
    font-weight: 450;
}
span{
    display: flex;
    align-items: center;
    gap:10px;
    h4{
        font-size: 18px;
        font-weight: 500;
    }
}
.order__details{
    // width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 2px 5px 0px rgba(219,185,185,0.75);
-webkit-box-shadow: 0px 2px 5px 0px rgba(219,185,185,0.75);
-moz-box-shadow: 0px 2px 5px 0px rgba(219,185,185,0.75);
    display: flex;
    justify-content: space-between;    
}
.product__details{
    display: flex;
    gap: 20px;
    h2{
        margin-top: -20px;
        display: flex;
        font-weight: 600;
        gap: 5px;
        align-items: center;
        p{
            font-size: 22px;
            margin-top: 24px; 
            font-weight: 400;
        }
    }
    h4{
        margin-top: -20px;
        font-size: 22px;
        font-weight: 500;
        gap: 5px;
        display: flex;
        align-items: center;
        p{
            font-size: 20px;
            font-weight: 400;
        }     
    }
    h5{
        font-size: 22px;
        font-weight: 550;
        margin-top: -20px;
        display: flex;
        gap: 5px;
        align-items: center;
        p{
            font-size: 20px;
            font-weight: 400;
        }
 
    }
    img{
        width: 200px;
        height: 200px;
        object-fit: contain;
    }
}
.order__amount{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;    
    h4{
        font-size: 18px;
        font-weight: 550;
        
    }
    p{
        font-size: 20px;
        font-weight: 400;
    }
}
.payment__status{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    h4{
        font-size: 18px;
        font-weight: 500;
    }    
    p{
        background: green;
        padding: 8px;
        text-transform: capitalize;
        color: #fff;
        border-radius: 12px;
    }
}
.order__invoices{
    display: flex;
    align-item: center;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: black;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid black;
        &:hover{
            background: #eee;
        }
    }
}
`

const OrderComponent = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [userId, setUserId] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [isUserCustomer, setIsUserCustomer] = useState(true)
    const [isUserBusiness, setIsUserBusiness] = useState(true);
    useEffect(() => {
        const fetchCustomerID = async () => {
            try {
                const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/user/validate-token", {
                    withCredentials: true,
                });
                setUserId(response.data.userId)
                if (response.status === 200) {
                    if (response.data.userType === 'customer') {
                        setIsUserBusiness(false)
                        setIsUserCustomer(true);
                    } else if (response.data.userType === 'business') {
                        setIsUserBusiness(true);
                        setIsUserCustomer(false)
                    }
                    setIsAuthorized(true);
                }
            } catch (error) {
                setIsAuthorized(false);
                if (error.response.data.message === "Token expired") {
                    navigate("/login/customer")
                } else if (error.response.data.message === "Unauthorized") {
                    // toast.error(error.response.data.message);
                } else {
                    toast.error(error.response.data.message);
                }
            }
        };
        fetchCustomerID();
    }, []);

    useEffect(() => {
        const fetchCustomerOrders = async () => {
            try {
                const response = await axios.get(`https://amazon-clone-backend-wofw.onrender.com/orders/order/id/${userId}`);
                setOrders(response.data); // Corrected to use response.data directly
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }
        if (userId) {
            fetchCustomerOrders();
        }
    }, [userId]);
    //  console.log(orders);
    return (
        <OrderStyledComponent>
            <h1>Your Purchased Products</h1>
            {isUserCustomer && orders.length > 0 && orders.map((order) => (
                <div key={order._id} className="order__details">
                    <div>
                    {order.products.map((product) => (
                        <div key={product._id} className="product__details">
                            <img src={product.productId.productImage} alt={product.productName} />
                            <div>
                                <h2>Product Name: <p>{product.productName}</p></h2>
                                <h4>Price: <p>${product.productPrice / product.productQuantity}</p></h4>
                                <h5>Purchased Quantity:<p> {product.productQuantity}</p></h5>
                                <h5 style={{display: !product.productSize || product.productSize === "" ? "none": "flex"}}>Purchased Size:<p> {product.productSize}</p></h5>
                                <h5 style={{display: !product.productColor || product.productColor === "" ? "none": "flex"}}>Selected Color: <p style={{background: product.productColor, width: "25px", height:"25px", borderRadius: "50%"}}></p></h5>
                            </div>

                        </div>
                    ))}
                    </div>
                    <div>
                        {
                            order.productInvoice.map((invoice) => (
                                <div key={invoice._id}>
                                    <div className="order__amount"><h4>Sub Total:</h4> <p>${invoice.subTotal / 100}</p> </div>
                                    <div className="order__amount"><h4>Total:</h4> <p>${invoice.total / 100}</p> </div>
                                    <div className="payment__status"><h4>Payment Status:</h4> <p>{invoice.paymentStatus}</p> </div>
                                    <div className="order__invoices"> <Link to={invoice.hostedInvoiceUrl} target="_blank" rel="noopener noreferrer">Invoice Url</Link> <Link to={invoice.invoicePdf} target="_blank" rel="noopener noreferrer">Download Invoice</Link> </div>
                                </div>
                            ))
                        }
                        <span><h4>Ordered at: </h4> {new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}</span>


                    </div>
                </div>
            ))}
            <ToastContainer />
        </OrderStyledComponent>
    );
}


export default OrderComponent;