import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loader from "../Loader/Loader";

const BusinessRegisterFormComponent = styled.div`
 width: 100%;
 display: grid;
 place-items: center;
 .business__register__account{
    border: 1px solid #001f3c;
    display: flex;
    width: 900px;
    margin-top: 60px;
 }
 .busines__register__email{
    display: block;
    padding: 20px;
    width: 50%;
    input{
        width: 97%;
        padding: 5px;
    }
    h4{
    font-weight: 400;
    }
    button{
        width: 100%;
        margin-top: 10px;
        background: #f90;
        padding: 10px;
        border: 1px solid #f90;
        cursor: pointer;
    }
    span{
        font-size: 14px;
    }
 }
 .business__register__info{
    background: #001f3c;
    width: 50%;
    display: block;
    color: #fff;
    h1{
        margin-left: 20px;
        font-size: 26px;
    }

 }
 .business__register__info__details{
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
    align-items: center;
    img{
        width: 50px;
    }
    .business__register__info__details__info{
        display: block;
        width: 300px;
        p{
            margin-top: -15px;
        }
    }
 }
 .business__register__info__img{
    width: 250px;
    margin-left: 100px;
 }
 
`

const BusinessRegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [loginResponse, setLoginResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const handleGetStartedClick = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/register/business/email', 
            {email: email});
            console.log(response.data.message);
            if (response.data.status === "OK") {
                navigate(`/register/business-account/${email}`)
                setLoading(false)
                
            } else {
                setLoading(false)
                setLoginResponse(response.data.message);

            }
        } catch (error) {
            setLoading(false)

            console.error('Registration failed');
        }
    }
    return (

        <BusinessRegisterFormComponent>
            <div style={{ display: loginResponse === "" ? "none" : "grid", fontSize: "24px", textAlign: "center", marginTop: "20px", background: "red", color: "#fff", placeItems: "center", width: "300px", height: "100px" }}>
                {loginResponse}
            </div>

            <div className="business__register__account">
                <div className="busines__register__email">
                    <h2>Let’s create your free Amazon Business account</h2>
                    <h4>Enter the email you'd like to use for your business account</h4>
                    <input type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setLoginResponse("")
                    }} />
                    <button onClick={handleGetStartedClick}>{loading ? <Loader /> : "Get Started"}</button>
                    <span>Already an Amazon Business customer? <Link to="/login/business">Sign in</Link> </span>
                </div>
                <div className="business__register__info">
                    <h1>Added value for every type of organization</h1>
                    <div className="business__register__info__details">
                        <img src="https://m.media-amazon.com/images/G/01/AmazonBusiness/Registration/desktop/icon-savings.svg" alt="img" />
                        <div className="business__register__info__details__info">
                            <h3>Buy more, save more</h3>
                            <p>From commerce to education, save on over 60 million products when you buy two or more.</p>
                        </div>
                    </div>
                    <div className="business__register__info__details">
                        <img src="https://m.media-amazon.com/images/G/01/AmazonBusiness/Registration/desktop/icon-addusers.svg" alt="addUser" />
                        <div className="business__register__info__details__info">
                            <h3>Connect your people</h3>
                            <p>Create groups, share payment methods, and manage supplies across locations.</p>
                        </div>
                    </div>
                    <div className="business__register__info__details">
                        <img src="https://m.media-amazon.com/images/G/01/AmazonBusiness/Registration/desktop/icon-bp.svg" alt="icon" />
                        <div className="business__register__info__details__info">
                            <h3>Get fast, FREE shipping with Business Prime</h3>
                            <p>Just one Business Prime membership covers unlimited free shipping on eligible orders for your entire organization.</p>
                        </div>
                    </div>
                    <img className="business__register__info__img" src="https://m.media-amazon.com/images/I/416LUsi8c6L.svg" alt="mansion" />
                </div>
            </div>
        </BusinessRegisterFormComponent>

    );
}

export default BusinessRegisterForm;