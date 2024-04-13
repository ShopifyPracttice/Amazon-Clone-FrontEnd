import styled from "styled-components";
import SmartHomeData from "./NavJsonComponents/SmartHome.json"

const SmartHomeComponent = styled.div`
h3{
    padding-left: 20px;
}
.smart__home__div{
    p{
        padding-left: 20px;
        padding-top:6px;
        padding-bottom: 6px;
        cursor: pointer;
    }
p:hover{
    background: #eee;
}
}
`

const SmartHome = () => {
    return ( 
        <SmartHomeComponent>
        <h3>Smart Home</h3>
         <div className="smart__home__div">
            {SmartHomeData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </SmartHomeComponent>
     );
}
 

export default SmartHome;