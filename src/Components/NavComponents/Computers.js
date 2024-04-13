import styled from "styled-components";
import ComputersData from "./NavJsonComponents/Computers.json"

const ComputerComponents = styled.div`
h3{
    padding-left: 20px;
}
.amazon__app__div{
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

const Computer = () => {
    return ( 
        <ComputerComponents>
        <h3>Computer</h3>
         <div className="amazon__app__div">
            {ComputersData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>

        </ComputerComponents>
     );
}
 
export default Computer;