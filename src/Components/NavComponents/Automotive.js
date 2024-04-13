import styled from "styled-components";
import AutomotiveData from "./NavJsonComponents/Automotive.json"

const AutomotiveComponent = styled.div`
h3{
    padding-left: 20px;
}
.automotive__div{
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

const Automotive = () => {
    return ( 
        <AutomotiveComponent>
       <h3>Automotive</h3>
         <div className="automotive__div">
            {AutomotiveData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>

        </AutomotiveComponent>
     );
}
 
export default Automotive;