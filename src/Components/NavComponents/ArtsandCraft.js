import styled from "styled-components";
import ArtsandCraftData from "./NavJsonComponents/ArtsandCrafs.json"

const ArtsandCraftComponent = styled.div`
h3{
    padding-left: 20px;
}
.arts__craft__div{
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

const ArtsandCraft = () => {
    return ( 
        <ArtsandCraftComponent>
        <h3>Arts & Crafts</h3>
         <div className="arts__craft__div">
            {ArtsandCraftData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </ArtsandCraftComponent>
     );
}
 
export default ArtsandCraft;