import styled from "styled-components"
import AccountOption from "./AccountOptions";
import { useNavigate } from "react-router-dom";

const CustomerStyledComponent = styled.div`
width: 100%;
height: 60vh;
display: grid;
place-items: center;
.customer__account{
    width: 70%;
    height: 400px;
    display: block;
    h1{
        font-weight: 400;
    }
    .customer__account__fields{
        width: 100%;
        height: 80%;
        display: grid;
        gap: 20px;
        grid-template-columns: auto auto auto; 
    }
}
`

const CustomerComponent = () => {
    const navigate = useNavigate()
    return (
        <CustomerStyledComponent>
            <div className="customer__account">
            <h1>Your Account</h1>
             <div className="customer__account__fields">
              <AccountOption 
              height="80px" 
              imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png"
              altImg="order"
              title="Your Orders"
              description="Track, return, cancel an order, download invoice or buy again"
              onClick={()=>{navigate("/customer/order")}}
              />
              <AccountOption
               height="80px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png"
               altImg="security"
               title="Login & Security"
               description="Edit, login, name and mobile number"
              />
              <AccountOption
               height="80px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime._CB433666831_.png"
               altImg="Prime"
               title="Prime"
               description="Mange your mambership, view benefits, and payemnt settings"
              />
              <AccountOption
               height="110px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png"
               altImg="Your Address"
               title="Your Address"
               description="Edit, remove or set default address"
              />
              <AccountOption
               height="110px"
               imgSrc="https://m.media-amazon.com/images/G/01/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250197_.jpg"
               altImg="Your business account"
               title="Your business account"
               description="Sign up for free to save with business-exclusive pricing and schedule fast deliveries to business-hours"
              />
              <AccountOption
               height="110px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png"
               altImg="Gift cards"
               title="Gift cards"
               description="View balance or radeem a card, and purchase a new Gift card"
              />
              <AccountOption
               height="100px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png"
               altImg="Your Payments"
               title="Your Payments"
               description="View all transactions,manage payment methods and settings"
              />
              <AccountOption
               height="100px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png"
               altImg="Your Profiles"
               title="Your Profiles"
               description="Manage, add, or remove user profiles for personalized experiences"
              />
              <AccountOption
               height="100px"
               imgSrc="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png"
               altImg="Digital Services and Device Support"
               title="Digital Services and Device Support"
               description="Troubleshoot device issues, manage or cancel digital subscriptions"
              />
              
             </div>
            </div>
        </CustomerStyledComponent>
      );
}
 
export default CustomerComponent;