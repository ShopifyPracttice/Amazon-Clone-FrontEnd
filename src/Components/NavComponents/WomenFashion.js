import styled from "styled-components";
import WomenFashionData from "./NavJsonComponents/WomenFashion.json"

const WomenFashionComponent = styled.div`
h3{
    padding-left: 20px;
}
.womens__fashion__div{
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

const WomenFashion = () => {
    return ( 
        <WomenFashionComponent>
       <h3>Women's Fashion</h3>
         <div className="womens__fashion__div">
            {WomenFashionData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </WomenFashionComponent>
     );
}
 
export default WomenFashion;