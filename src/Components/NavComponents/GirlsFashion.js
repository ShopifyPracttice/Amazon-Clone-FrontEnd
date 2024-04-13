import styled from "styled-components";
import GirlsFashionData from "./NavJsonComponents/GirlsFashion.json"

const GirlsFashionComponent = styled.div`
h3{
    padding-left: 20px;
}
.girls__fashion__div{
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

const GirlsFashion = () => {
    return ( 
        <GirlsFashionComponent>
        <h3>Girl's Fashion</h3>
         <div className="girls__fashion__div">
            {GirlsFashionData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
        </div>
        </GirlsFashionComponent>
     );
}
 
export default GirlsFashion;