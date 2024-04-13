import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerLoginComponents = styled.div`
width: 100%;
display: grid;
place-items: center;
.customer__login{
    width: 30%;
    padding: 10px;
}
p{
    width: 115px;
    height: 0px;
    border: 1px solid #ddd;
}
img{
    width: 200px;
    margin-left: 80px;
    height: 100px;
}
form{
    width: 70%;
    border: 1px solid #ddd;
    display: flex;
    padding: 35px;
    flex-direction: column;
    button{
        padding: 6px;
        font-size: 16px;
        background: #F0B800;
        border: none;
        margin-top: 5px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    span{
        font-size: 12px;
        height: 60px;
        border-bottom: 1px solid #ddd;
    }

    label{
        font-weight: 700;
    }
    h3{
        font-size: 14px;
    }
    a{
        font-size: 12px;
    }
}
input{
    margin-top: 10px;
    padding: 8px;
    margin-bottom: 10px;
}
.customer__login__route{
    width: 88%;
    display: flex;
    flex-direction: column;
    a{
        text-decoration: none;
        color: #222;
        cursor: pointer;
    }
    button{
        background: #fff;
        border: 1px solid #ddd;
        width: 100%;
        cursor: pointer;
        padding: 4px;
    }
}

`

const CustomerLoginComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginResponse, setLoginResponse] = useState('');
    console.log(loginResponse);
    const [form, setForm] = useState({
        customerEmail: "",
        customerPassword: ""
    });
    
    const handleCustomerLogin = async (e)=>{
        e.preventDefault();
         setLoading(true) 
          try {
        const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/login/customer', form, {
        withCredentials: true,  
      });
    //   console.log(response);
      const token = response.data.token;
      console.log(token);
    //   document.cookie = `token=${token}; path=/;`;
        if(response.data.status === "ok"){
        toast.success(response.data.message);
        setLoading(false)
        setLoginResponse(response.data.message);
        setForm({
          customerEmail: '',
          customerPassword: ''
        })

        navigate("/")
      }else{
        setLoading(false)
        setLoginResponse(response.data.message);
        toast.error(response.data.message);
        setForm({
            customerPassword: ''
          })
      }
          } catch (error) { 
            setLoading(false)
        setLoginResponse(error.response.data.message);
          }
      }
    
    // const handleCustomerLogin = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    
    //     try {
    //         const response = await fetch('https://amazon-clone-backend-wofw.onrender.com/user/login/customer', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify(form)
    //         });
    
    //         const responseData = await response.json();
    
    //         if (response.ok) {
    //             const token = responseData.token;
    //             document.cookie = `token=${token}; path=/;`;
    //             // toast.success(responseData.data.message);
    //                 setLoading(false)
    //                 // setLoginResponse(responseData.data.message);
    //                 setForm({
    //                   customerEmail: '',
    //                   customerPassword: ''
    //                 })
            
    //                 navigate("/")
                
    //             // Handle successful login
    //             // Redirect or update state as needed
    //         } else {

    //             setLoading(false)
    //                 // setLoginResponse(responseData.data.message);
    //                 // toast.error(responseData.data.message);
    //                 setForm({
    //                     customerPassword: ''
    //                   })
    //             // Handle login failure
    //         }
    //     } catch (error) {
    //         setLoading(false)
    //             setLoginResponse(error.response.data.message);
    //         // Handle network errors
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    

    return ( 
        <CustomerLoginComponents>
            <div className="customer__login">
               <img src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png" alt="amazon-logo"/>
               {/* <div style={{  display: loginResponse === "" ? "none" : "grid", fontSize: "24px" ,marginLeft: "30px", marginBottom: "50px"  ,background: "red", color: "#fff", placeItems:"center", width: "300px", height:"100px"}}>
                  {loginResponse}
               </div> */}
               <form onSubmit={handleCustomerLogin}>
                  <h2>Sign in</h2>
                  <label>Email</label>
                  <input type="email"
                  value={form.customerEmail}
                  onChange={(e) => {setForm({ ...form, customerEmail: e.target.value })
                //   setLoginResponse("")
                }}
                  required/>
                  <label>Password</label>
                  <input type="password"
                  value={form.customerPassword}
                  onChange={(e) => {setForm({ ...form, customerPassword: e.target.value })
                //   setLoginResponse("")
                }}
                  required/>
                  <button type="submit">{loading? <Loader/> : "Sign in"}</button>
                  <span>By continuing, you agree to Amazon's <Link>Conditions of Use</Link> and <Link>Privacy Notice.</Link> </span>
                  <h3>Buying for work?</h3>
                  <Link to="/login/business">Shop on Amazon Business</Link>
               </form>
               <div className="customer__login__route">
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <p></p>
                    <h6>New to Amazon?</h6>
                    <p></p>
                  </div>
                  <Link to="/register/customer-account"><button>Create your Amazon account</button></Link>
               </div>
            </div>
            <ToastContainer />

        </CustomerLoginComponents>
     );
}
 
export default CustomerLoginComponent;