import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';

const CartDrawerStyledComponent = styled.div`
position: absolute;
box-shadow: -3px 1px 5px 0px #e1e1e1;
-webkit-box-shadow: -3px 1px 5px 0px #e1e1e1;
-moz-box-shadow: -3px 1px 5px 0px #e1e1e1;
top:0;
right: 0;
    width: ${(props) => (props.opencart ? "150px" : "0px")};
height: 100vh;
overflow: hidden;
transition: .3s all ease-in;
background: #fff;
z-index: 100;
.cart__total{
    display: grid;
    place-items: center;
    p{
        color: #c45500;
        font-weight: 600;
    }
}
.cart__products {
    height: 80vh;
    overflow: auto;
}

.cart__products::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}

/* Track (the area behind the scrollbar) */
.cart__products::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the track */
}

/* Handle (the draggable part of the scrollbar) */
.cart__products::-webkit-scrollbar-thumb {
    background: #888; /* Color of the handle */
}

/* Handle on hover */
.cart__products::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the handle when hovered */
}
.cart__product{
    display: grid;
    height: 180px;
    padding: 12px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    place-items: center;
    img{
        width:100px;
        object-fit: contain;
        height: 100px;
    }
    h5{
        margin-top: 0px;
    }
}
.cart__actions{
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    p{
        width: 60px;
        height: 20px;
        display: grid;
        place-items: center;
        border: 1px solid #ddd;
        border-radius: 12px;
    }
    span{
        padding: 4px;
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer; 
    }
}
.checkut__btn{
  width: 100%;
  border-top: 1px solid #ddd;
  height: 10vh;
  display: grid;
  place-items: center;
  button{
    background: black;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
  }
}
`

const CartDrawerComponent = ({openCart,setOpenCart}) => {
    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState(true) 
    const [userId, setUserId] = useState("")
    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(true);
  const [isUserCustomer, setIsUserCustomer] = useState(true);
  const [isUserBusiness, setIsUserBusiness] = useState(true);
      
      useEffect(()=>{
        const fetchUserData = async () => {
            try {
              const response = await axios.get('https://amazon-clone-backend-wofw.onrender.com/user/validate-token', {
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
        // toast.error(error.response.data.message);
              setIsAuthorized(false);
            }
            // window.location.reload();
      
          };

          
      
          fetchUserData();
    })
    const handleCartItemDelete = async (productID, productStock)=>{
      setIsLoading(true)
      try{
        const response = await axios.delete(`https://amazon-clone-backend-wofw.onrender.com/product/cartProducts/${userId}/${productID}`, {
          params: {
             productStock: productStock
          }
       })
        setIsLoading(false)
        toast.success(response.data.message);
      //  toast.success(response.data.message)
        // setOpenCart(false)
      }catch(err){
        setIsLoading(false)
        toast.error(err.response.data.message);
        // toast.error(err.response.data.message)
      }
    }
    useEffect(()=>{
        const fetchCartDetails = async() =>{
          setUpdateData(false)
            try {
                const response = await axios.get(`https://amazon-clone-backend-wofw.onrender.com/product/cartProducts/ids/${userId}`, {
                  withCredentials: true,
                });
                setSubTotal(response.data.subTotals)
                setCartProducts(response.data.cartProducts)
                console.log(response.data.cartProducts);
                setUpdateData(true)
              } catch (error) {
        toast.error(error.response.data.message);
              }
          }
          fetchCartDetails();
    },[openCart, updateData ])
    useEffect(() => {
        const handleClickOutside = (event) => {
          const cartDrawer = document.querySelector('.cart-drawer');
          
          // If the click occurred outside the cart drawer, close it
          if (cartDrawer && !cartDrawer.contains(event.target)) {
            setOpenCart(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [setOpenCart]);

      const handleCheckOut = async() =>{
        const stripe = await loadStripe('pk_test_51OzdTnFshF4E0vp9xRvqldm12BpGBBWgQFqequ44ojV7wbahpToBdkSjHzqb96LaVPs2DYpgdzfuvFA1trzoDoBl002TL1h2XW');
        try{
            if(isUserCustomer, userId){
              const modifiedCartProducts = cartProducts.map(product => {
                const { productImageUrl, ...rest } = product;
                return {...rest, userId};
              });
              console.log(modifiedCartProducts);
              if(cartProducts.length !== 0){
                const response = await axios.post("https://amazon-clone-backend-wofw.onrender.com/create-checkout-session", modifiedCartProducts)
                const result = stripe.redirectToCheckout({
                    sessionId: response.data.id
                })      
              }
              }
        }catch(err){
           console.log(err);
           toast.error("Check Limit Reached! Plz buy less products at a time!")
        }
      }


    return ( 
        <CartDrawerStyledComponent className="cart-drawer" opencart={openCart}>
            <div className="cart__total">
               <span>Subtotal</span>
               <p>${subTotal}.00</p>
            </div>
            <div className="cart__products">
            {isUserCustomer && cartProducts.length > 0 && cartProducts.map((product)=>(
                <div className="cart__product" key={product._id}>
                  <img src={product.productImageUrl} alt={product.productName}/>
                  <h5>${product.productPrice}</h5>
                  <div className="cart__actions">
                       <p>{product.productQuantity}</p>
                       <span onClick={()=>handleCartItemDelete(product.productId, product.productQuantity)}> {isLoading?<Loader/>: <DeleteOutlineOutlinedIcon fontSize="small"/>} </span>
                  </div>
                </div>
                
               ))}
            </div>
            <div className="checkut__btn">
              <button onClick={handleCheckOut}>Checkout</button>
            </div>
            {/* <ToastContainer /> */}
        </CartDrawerStyledComponent>
     );
}
 
export default CartDrawerComponent;