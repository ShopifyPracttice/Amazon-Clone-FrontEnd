import styled from "styled-components";
import BoysFashionData from "./NavJsonComponents/BoysFashion.json"

const BoysFashionComponent = styled.div`
h3{
    padding-left: 20px;
}
.boys__fashion__div{
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

const BoysFashion = () => {
    return ( 
        <BoysFashionComponent>
       <h3>Boy's Fashion</h3>
         <div className="boys__fashion__div">
            {BoysFashionData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </BoysFashionComponent>
     );
}
 


export default BoysFashion;