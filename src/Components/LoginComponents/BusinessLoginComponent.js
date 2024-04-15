import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessLoginComponents = styled.div`
width: 100%;
display: grid;
place-items: center;
.business__login{
    width: 30%;
    padding: 10px;
}
p{
    width: 95px;
    height: 0px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #ddd;
}
img{
    width: 140px;
    margin-left: 120px;
    height: 40px;
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
        background: #2f6199;
        border: none;
        color: #fff;
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
.business__login__route{
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

const BusinessLoginComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginResponse, setLoginResponse] = useState("")
    const [form, setForm] = useState({
        ownerEmail: "",
        ownerPassword: ""
    })
    const handleBusinessLogin = async (e)=>{
        e.preventDefault();
         setLoading(true) 
          try {
        const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/login/business', form, {
        withCredentials: true,  
      });
        if(response.data.status === "ok"){
        setLoading(false)
        toast.success(response.data.message);
        setForm({
          ownerEmail: '',
          ownerPassword: ''
        })
        navigate("/")
      }else{
        setLoading(false)
        toast.error(response.data.message);
        setLoginResponse(response.data.message);
        setForm({
            ownerPassword: ''
          })
      }
          } catch (error) {
            setLoading(false)
            console.error('Login failed');
          }
      }
    return ( 
        <BusinessLoginComponents>
        <div className="business__login">
               <img src="https://m.media-amazon.com/images/G/01/AmazonBusiness/Registration/email/ab-logo-blue-black-newLogo._CB463467447_.png" alt="amazon-logo"/>
               {/* <div style={{  display: loginResponse === "" ? "none" : "grid", fontSize: "18px", fontWeight: "600" ,marginLeft: "80px", marginTop: "30px", marginBottom: "50px"  ,background: "red", color: "#fff", placeItems:"center", width: "200px", height:"60px"}}>
                  {loginResponse}
               </div> */}
               <form onSubmit={handleBusinessLogin}>
                  <h2>Sign in</h2>
                  <label>Email</label>
                  <input type="email"
                  value={form.ownerEmail}
                  onChange={(e) => {setForm({ ...form, ownerEmail: e.target.value })
                  setLoginResponse("")
                }} required/>
                  <label>Password</label>
                  <input type="password"
                  value={form.ownerPassword}
                  onChange={(e) => {setForm({ ...form, ownerPassword: e.target.value })
                  setLoginResponse("")
                }}
                  required/>
                  <button >{loading? <Loader/> : "Sign in"}</button>
            <ToastContainer />
                  <span>By continuing, you agree to Amazon's <Link>Conditions of Use</Link> and <Link>Privacy Notice.</Link> </span>
               </form>
               <div className="business__login__route">
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <p></p>
                    <h6>New to Amazon Business?</h6>
                    <p></p>
                  </div>
                  <Link to="/register/business-account"><button>Create your free business account</button></Link>
               </div>
            </div>
            </BusinessLoginComponents>
     );
}
 
export default BusinessLoginComponent;