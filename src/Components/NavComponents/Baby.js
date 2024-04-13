import styled from "styled-components";
import BabyData from "./NavJsonComponents/Baby.json"

const BabyComponent = styled.div`
h3{
    padding-left: 20px;
}
.baby__div{
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

const Baby = () => {
    return ( 
        <BabyComponent>
        <h3>Baby</h3>
         <div className="baby__div">
            {BabyData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </BabyComponent>
     );
}
 
export default Baby;