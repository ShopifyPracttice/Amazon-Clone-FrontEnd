import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessInfoSectionComponent = styled.div`
width: 100%;
display: grid;
place-items: center;
.business__info__page{
    display: block;
    width: 30%;
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 30px;
}
.business__info__page__details{
    border-bottom: 1px solid #999;
    h1{
        font-weight: 400;
        font-size: 26px;
    }
}

form{
    border-bottom: 1px solid #999;
    padding-bottom: 20px;
    h2{
        font-size: 22px;
    }
    input{
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    select{
        padding: 8px;
        cursor: pointer;
    }
}
button{
    background: #f90;
    border: 1px solid #f90;
    width: 100%;
    margin-top: 14px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    cursor: pointer;
}
span{
    font-size: 12px;
    margin-bottom: 10px;
}
`

const BusinessInfoComponent = () => {
  let { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [loginResponse, setLoginResponse] = useState("")
  const [formData, setFormData] = useState({
    ownerEmail: email,
    ownerName: "",
    businessPhone: "",
    ownerPassword: "",
    businessName: "",
    streetAdress: "",
    unitFloor: "",
    zipCode: "",
    city: "",
    state: "",
    businessType: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCreateBusinessAccount = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/register/business/details', formData,{
        withCredentials: true,  
      });
      if (response.data.status === "OK") {
        toast.success(response.data.message)
        navigate(`/`)
        setLoading(false)
        setFormData({
          ownerEmail: email,
          ownerName: "",
          businessPhone: "",
          ownerPassword: "",
          businessName: "",
          streetAdress: "",
          unitFloor: "",
          zipCode: "",
          city: "",
          state: "",
          businessType: ""
        })

      } else {
        setLoading(false)
        setLoginResponse(response.data.message);
         toast.error(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Registration failed!")
    }

  }
  return (
    <BusinessInfoSectionComponent>
      {/* <div style={{ display: loginResponse === "" ? "none" : "grid", fontSize: "24px", textAlign: "center", marginTop: "20px", background: "red", color: "#fff", placeItems: "center", width: "300px", height: "100px" }}>
        {loginResponse}
      </div> */}

      <div className="business__info__page">
        <div className="business__info__page__details">
          <h1>Enter your business details</h1>
          <p>Tell us about you and your business so we can verify it. Please provide information per your official documents to get verified quicker.</p>
        </div>
        <form onSubmit={handleCreateBusinessAccount}>
          <h2>Contact information</h2>
          <div style={{ display: "grid" }}>
            <label>First and last name</label>
            <input type="text"
              name="ownerName"
              value={formData.ownerName}
              required
              onChange={handleChange} />
          </div>
          <div style={{ display: "grid" }}>
            <label>Business phone</label>
            <input type="text"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              required />
          </div>
          <div style={{ display: "grid" }}>
            <label>Password</label>
            <input type="password"
              name="ownerPassword"
              value={formData.ownerPassword}
              onChange={handleChange}
              required />
          </div>
        </form>
        <ToastContainer/>
        <form onSubmit={handleCreateBusinessAccount}>
          <h2>Business information</h2>
          <div style={{ display: "grid" }}>
            <label>Business name</label>
            <input type="text"
              name="businessName"
              value={formData.businessName}
              required
              onChange={(e) => {
                handleChange(e);
                setLoginResponse("");
              }} />
          </div>
          <div className="business__info__page__form__info">
            <div style={{ display: "flex" }}>
              <input type="radio"
                name="businessType"
                value="soleProprietorship"
                onChange={handleRadioChange}
                 />
              <label>Sole proprietorship (Not registered)</label>
            </div>
            <div style={{ display: "flex" }}>
              <input type="radio"
                name="businessType"
                value="other"
                onChange={handleRadioChange} />
              <label>Other</label>
            </div>
          </div>
        </form>
        <form>
          <h2>Business address</h2>
          <p>Have multiple locations? Use the address shown on official documents like tax forms.</p>
          <div style={{ display: "grid" }}>
            <label>Street address</label>
            <input type="text"
              name="streetAdress"
              value={formData.streetAdress}
              required
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "grid" }}>
            <label>Suite, unit, floor (optional)</label>
            <input type="text"
              name="unitFloor"
              value={formData.unitFloor}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "grid" }}>
            <label>ZIP code</label>
            <input type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "grid" }}>
            <label>City</label>
            <input type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "grid" }}>
            <label>State</label>
            <select required name="state" onChange={handleChange} value={formData.state}>
              <option disabled hidden value>Select a state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AS">American Samoa</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
            </select>
          </div>
        </form>
        <button>{loading ? <Loader /> : "Create business account"}</button>
        <span>By creating a business account, you agree to the <Link>Amazon Business Accounts Terms and Conditions.</Link>  You are creating a business account on behalf of the organization named above and agree you have authority to bind that organization.</span>
      </div>
    </BusinessInfoSectionComponent>
  );
}

export default BusinessInfoComponent;