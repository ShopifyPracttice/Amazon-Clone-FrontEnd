import styled from "styled-components";
import ElectronicsData from "./NavJsonComponents/Electronics.json"

const ElectronicsComponent = styled.div`
h3{
    padding-left: 20px;
}
.electronics__div{
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

const Electronics = () => {
    return ( 
        <ElectronicsComponent>
        <h3>Electronics</h3>
         <div className="electronics__div">
            {ElectronicsData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
          </div>  
        </ElectronicsComponent>
     );
}
 
export default Electronics;