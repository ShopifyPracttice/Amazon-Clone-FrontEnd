import styled from "styled-components"
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductSkeleton from "./ProductSkeleton";
import Loader from "../Loader/Loader";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';


const ProductStyledComponent = styled.div`
width: 100%;
padding-top: 50px;
display: flex;
img{
    width: 22%;
    object-fit: contain;
    height: 70vh;
}
justify-content: space-evenly;
.product__details{
    h1{
        font-weight: 400;
    }
    h2{
        font-weight: 400;
    }
    h3{
        font-weight: 600;
    }
    h4{
        font-weight: 400;
        width: 90%;
    }
    .product__colors{
        display: flex;
        gap: 20px;
    }
    p{
        font-weight: 550;
    }
}
.product__details__checkout{
    width: 18%;
    border-radius: 6px;
    // height: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    display: grid;
    h3{
        font-size: 26px;
        font-weight: 550;
    }
    h4{
        font-weight: 400;
        width: 100%;
    }
    select{
        padding: 5px;
        background: #ddd;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
-webkit-box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
-moz-box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
    }
    button{
        border: none;
    background: ${(props) => (props.usertype === "" || props.usertype === "business" ? "hsl(45, 100%, 40%)" : "#F0B800")};
    color: ${(props) => (props.usertype === "" || props.usertype === "business" ? "#fff" : "black")};
    cursor: ${(props) => (props.usertype === "" || props.usertype === "business" ? "not-allowed" : "pointer")};
        box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
-webkit-box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
-moz-box-shadow: 3px 4px 5px 0px rgba(140,100,100,0.75);
        padding: 10px;
        margin-top: 10px;
        border-radius: 20px; 
    }
    p{
        font-size: 14px;
    }
}
.product__size{
    display: flex;
    gap: 10px;
    text-transform: capitalize;
}
`

const Product = ({ setOpenCart }) => {
    const navigate = useNavigate();
    const productID = useParams();
    let orderId;
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState("")
    const [userId, setUserId] = useState("")
    const [productDetail, setProductDetail] = useState([]);
    const [colorImages, setColorImages] = useState("")

    const [cartProducts, setCartProducts] = useState({
        productId: productID,
        productName: productDetail.productName,
        productBrand: productDetail.productBrand,
        productPrice: productDetail.productPurchasePrice,
        productQuantity: 1,
        productColor: "",
        productSize: "",
        productImage: productDetail.productImage
    })

    useEffect(() => {
        const fetchCustomerID = async () => {
            try {
                const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/user/validate-token", {
                    withCredentials: true,
                });
                setUserId(response.data.userId)
                setUserType(response.data.userType);
            } catch (error) {
                if (error.response.data.message === "Token expired") {
                    navigate("/login/customer")
                } else if (error.response.data.message === "Unauthorized") {
                    console.log(error);
                    // toast.error(error.response.data.message);

                } else {
                    console.log(error);
                    toast.error(error.response.data.message)

                }
            }
        };

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://amazon-clone-backend-wofw.onrender.com/product/product/id/${productID.id}`);
                setProductDetail(response.data)
                console.log(response);
            } catch (err) {
                console.error(err);
                toast.error(err.response.data.message);

            }
        };
        fetchCustomerID()
        fetchProductDetails();
    }, [productID]);

    const handleAddToCart = async (value) => {
        const price = cartProducts.productQuantity * value;

        try {
            if (userType === "customer") {
                setIsLoading(true)
                const response = await axios.put(`https://amazon-clone-backend-wofw.onrender.com/product`, {
                    userId: userId,
                    sellerId: productDetail.userId,
                    productId: productID.id,
                    productName: productDetail.productName,
                    productBrand: productDetail.productBrand,
                    productPrice: price,
                    productRetailPrice: productDetail.productRetailPrice,
                    productQuantity: cartProducts.productQuantity,
                    productColor: cartProducts.productColor,
                    productSize: cartProducts.productSize,
                    productImage: productDetail.productImage
                });
                setCartProducts({
                    productQuantity: 1
                })
                setIsLoading(false)
                toast.success(response.data.message);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            toast.error(err.response.data.message);

        }
    }
    const handleQuantityChange = (event) => {
        const { value } = event.target;
        setCartProducts(prevState => ({
            ...prevState,
            productQuantity: parseInt(value) // Convert value to integer
        }));
    };
    const handleBuyNow = async (value, orderID) => {
        const price = cartProducts.productQuantity * value;
        const stripe = await loadStripe('pk_test_51OzdTnFshF4E0vp9xRvqldm12BpGBBWgQFqequ44ojV7wbahpToBdkSjHzqb96LaVPs2DYpgdzfuvFA1trzoDoBl002TL1h2XW');
        try {
            if (userType === "customer") {
                const response = await axios.post("https://amazon-clone-backend-wofw.onrender.com/create-buy-session", {
                    sellerId: productDetail.userId,
                    userId: userId,
                    productId: productID.id,
                    productName: productDetail.productName,
                    productBrand: productDetail.productBrand,
                    productPrice: price,
                    productRetailPrice: productDetail.productRetailPrice,
                    productQuantity: cartProducts.productQuantity,
                    productColor: cartProducts.productColor,
                    productSize: cartProducts.productSize,
                    // productImage: productDetail.productImage
                })
                // console.log(response);
                const result = stripe.redirectToCheckout({
                    sessionId: response.data.id
                })
                // console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {productDetail.length === 0 && <ProductSkeleton />}
            {productDetail.length !== 0 &&
                <ProductStyledComponent usertype={userType}>
                    <img src={colorImages === "" ? productDetail.productImage : colorImages} alt={productDetail.productName} />
                    <div className="product__details">
                        <h1>Brand:{productDetail.productBrand}</h1>
                        <h2>{productDetail.productName}</h2>
                        <h3>${productDetail.productPurchasePrice}</h3>
                        <h4>$121.41 Shipping & Import Fees Deposit to Pakistan Details</h4>
                        <h4>Available at a lower price from other sellers that may not offer free Prime shipping.</h4>
                        <p style={{ display: productDetail.colors && productDetail.colors.length === 0 ? "none" : "block" }}>Colors:</p>
                        <div className="product__colors">
                            {productDetail.colors && productDetail.colors.map((color) => (
                                <div style={{
                                    padding: "5px", borderRadius: "50%", width: "20px", height: "20px",
                                    border: `1px solid ${cartProducts.productColor === color.color ? '#333' : '#ddd'}`
                                }} onClick={() => setCartProducts(prevState => ({
                                    ...prevState,
                                    productColor: color.color // Update productColor with the selected size
                                }))}>
                                    <div key={color._id} style={{ background: color.color, cursor: "pointer", width: "20px", height: "20px", borderRadius: "50%" }} onClick={() => setColorImages(color.image)}>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {productDetail.colors && productDetail.colors.some(color => color.size !== '') && (
                            <>
                                <p>Sizes:</p>
                                <div className="product__size">
                                    {productDetail.colors.map((color) => (
                                        color.size !== '' && (

                                            <div style={{
                                                borderRadius: "20px", cursor: "pointer",
                                                border: `1px solid ${cartProducts.productSize === color.size ? '#333' : '#ddd'}`

                                                , padding: "10px"
                                            }} onClick={() => setCartProducts(prevState => ({
                                                ...prevState,
                                                productSize: color.size
                                            }))}>
                                                {color.size}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                    <div className="product__details__checkout">
                        <h3>${productDetail.productPurchasePrice}</h3>
                        <h4>$121.41 Shipping & Import Fees Deposit to Pakistan Details</h4>
                        <span>In Stock</span>
                        {cartProducts.productQuantity > 0 ? (
                            <select value={cartProducts.productQuantity} onChange={handleQuantityChange}>
                                {[...Array(cartProducts.productQuantity)].map((_, idx) => (
                                    <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                                ))}
                            </select>
                        ) : (
                            <p>Out of Stock</p>
                        )}
                        <button onClick={() => handleAddToCart(productDetail.productPurchasePrice)} disabled={userType === "" || userType === "business" ||cartProducts.productQuantity === 0}>{isLoading ? <Loader /> : "Add to Cart"}</button>
                        <button disabled={cartProducts.productQuantity === 0} style={{ background: "#f90" }} onClick={() => handleBuyNow(productDetail.productPurchasePrice, productDetail._id)}>Buy Now</button>
                        <ToastContainer />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Ship from</p>
                            <p>Amazon.com</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Sold by</p>
                            <p>Amazon.com</p>
                        </div>
                    </div>
                </ProductStyledComponent>
            }
        </>
    );
}

export default Product;