import styled from "styled-components";
import LuggageData from "./NavJsonComponents/Luggage.json"

const LuggageComponent = styled.div`
h3{
    padding-left: 20px;
}
.luggage__div{
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

const Luggage = () => {
    return ( 
        <LuggageComponent>
        <h3>Luggage</h3>
         <div className="luggage__div">
            {LuggageData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </LuggageComponent>
     );
}
 
export default Luggage;