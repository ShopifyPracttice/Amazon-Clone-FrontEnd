import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";
import {ToastContainer, toast } from 'react-toastify';

const RegisterComponents = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  img{
    width: 200px;
    height: 100px;
  }
  label{
    display: grid;
    font-size: 14px;
    font-weight: 600;
  }
  .register-form{
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 12px;
  }
  .register-form input{
    width: 300px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .register-form-label{
    display: grid;
    margin-bottom: 10px;
  }
  .register-form-label span{
    font-size: 14px;
  }
  button{
    background: #FFD814;
    border: none;
    cursor: pointer;
    width: 313px;
    margin-top: 10px;
    height: 30px;
    border-radius: 12px;
  }
  h6{
    max-width: 320px;
    border-bottom: 1px solid #eee;
    font-weight: 300;
    font-size: 13px;
    height: 60px;
    margin-bottom: 10px;
  }
  a{
    text-decoration: none;
    color: darkblue;
  }
  .register__business__route{
    display: block;
    height: 70px;
    border-bottom: 1px solid #eee;
    p{
     margin-top: -20px;
     font-size: 14px;
    }
  }
  h4{
    font-size: 12px;
  }

`

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [loginResponse, setLoginResponse] = useState("");
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPassword: ''
  });
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loading, setLoading] = useState(false)
  
  const handleCustomerRegister = async (e)=>{
    e.preventDefault();
    if (formData.customerPassword !== confirmPassword) {
      toast.error("Password & Confirm Password Do no Match!")
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
       setLoading(true) 
      try {
    const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/register/customer', formData, {
    withCredentials: true,  
  });
  if(response.data.status === "ok"){
    setLoading(false)
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPassword: ''
    })
    toast.success(response.data.message)
    navigate("/")
  }else{
    setLoading(false)
    setLoginResponse(response.data.message);
    setFormData({
        customerPassword: ''
      })
    toast.error(response.data.message)
  }
      } catch (error) {
    setLoading(false)
        console.error('Registration failed');
    toast.error("Registraton Failed")
      }
  
    }
  }
    return ( 
    <RegisterComponents>    
             <div>
                <img src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png" alt="amazon-logo"/>
             </div>
             {/* <div style={{  display: loginResponse === "" ? "none" : "grid", fontSize: "24px", textAlign: "center" , marginBottom: "50px"  ,background: "red", color: "#fff", placeItems:"center", width: "300px", height:"100px"}}>
                  {loginResponse}
               </div> */}
             <div className="register-form">
                <form onSubmit={handleCustomerRegister}>
                  <h1>Create Account</h1>
                <div>
                  <label>Your Name</label>
                  <input type="text" 
                  placeholder="First and last name" 
                  value={formData.customerName}
                  required
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div> 
                <div>
                  <label>Email</label>
                  <input 
                  type="email"
                  value={formData.customerEmail}
                  required
                  onChange={(e) => {setFormData({ ...formData, customerEmail: e.target.value })
                  setLoginResponse("")
                }}
                  />
                </div> 
                <div className="register-form-label">
                  <label>Password</label>
                  <input 
                  type="password"
                  required 
                  placeholder="At least 6 characters"
                  value={formData.customerPassword}
                  onChange={(e) => {setFormData({ ...formData, customerPassword: e.target.value })
                   setLoginResponse("")
                }
                }
                  />
                  <span><i>i</i> Passwords must me at least 6  characters</span>
                </div>
                <div style={{display: "grid"}}>
                  <label>Re-enter Password</label>
                  <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {setConfirmPassword(e.target.value)
                     setPasswordMatchError(false)
                    setLoginResponse("")
                    }
                    }
                  />
                  {passwordMatchError && (
              <span style={{ color: 'red' }}>Passwords do not match</span>
            )}
                </div>
                <button type="submit">{loading? <Loader/> : "Continue"}</button>
            <ToastContainer />
                <h6>By creating an account, you agree to Amazon's <Link >Conditions of Use</Link>  and <Link>Privacy Notice</Link> .</h6>
                <div className="register__business__route">
                    <h5>Buying for work?</h5>
                    <p><Link to="/register/business-account">Create a free business account</Link></p>
                </div>
                <h4>Already have an account? <Link to="/login/customer">Sign in</Link></h4>    
                </form>
             </div>
        </RegisterComponents>
     );
}
 
export default RegisterComponent;