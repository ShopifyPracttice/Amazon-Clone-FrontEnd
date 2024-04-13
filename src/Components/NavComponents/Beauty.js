import styled from "styled-components";
import BeautyData from "./NavJsonComponents/Beauty.json"

const BeautyComponent = styled.div`
h3{
    padding-left: 20px;
}
.beauty__personal__div{
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

const Beauty = () => {
    return ( 
        <BeautyComponent>
       <h3>Beauty and Personal Care</h3>
         <div className="beauty__personal__div">
            {BeautyData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </BeautyComponent>
     );
}
 
export default Beauty;