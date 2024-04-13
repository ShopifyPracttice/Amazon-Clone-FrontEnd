import { useState } from "react";
import RegisterNav from "../../Components/RegisterComponents/RegisterNav";
import BusinessInfoComponent from "../../Components/RegisterComponents/BusinessInfoComponent";


const BusinessInfo = () => {
    const [activeForm, setActiveForm] = useState(2)
    return ( 
        <>
        <RegisterNav activeForm={activeForm}/>
        <BusinessInfoComponent/>
        </>
     );
}
 
export default BusinessInfo;