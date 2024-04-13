import styled from "styled-components";
import AmazonAppData from "./NavJsonComponents/AmazonApp.json"

const AmazonAppComponent = styled.div`
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

const AmazonApp = () => {
    return ( 
        <AmazonAppComponent>
         <h3>Amazon Appstore</h3>
         <div className="amazon__app__div">
            {AmazonAppData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>

        </AmazonAppComponent>
     );
}
 
export default AmazonApp;