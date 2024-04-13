import { useState } from "react";
import RegisterNav from "../../Components/RegisterComponents/RegisterNav";
import BusinessRegisterForm from "../../Components/RegisterComponents/BusinessRegister";

const BusinessRegisterPage = () => {
    const [activeForm, setActiveForm] = useState(1);
    return ( 
        <>
        <RegisterNav activeForm={activeForm}/>
        <BusinessRegisterForm/>
        </>
     );
}
 
export default BusinessRegisterPage;