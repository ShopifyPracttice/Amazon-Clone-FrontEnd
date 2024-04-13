import styled from "styled-components";
import MensFashionData from "./NavJsonComponents/MensFashion.json"

const MensFashionComponent = styled.div`
h3{
    padding-left: 20px;
}
.mens__fashion__div{
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

const MensFashion = () => {
    return ( 
        <MensFashionComponent>
       <h3>Men's Fashion</h3>
         <div className="mens__fashion__div">
            {MensFashionData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </MensFashionComponent>
     );
}
 


export default MensFashion;