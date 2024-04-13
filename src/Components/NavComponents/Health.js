import styled from "styled-components";
import HealthData from "./NavJsonComponents/Health.json"

const HealthComponent = styled.div`
h3{
    padding-left: 20px;
}
.health__div{
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

const Health = () => {
    return ( 
        <HealthComponent>
      <h3>Health & Household</h3>
         <div className="health__div">
            {HealthData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </HealthComponent>
     );
}
 
export default Health;