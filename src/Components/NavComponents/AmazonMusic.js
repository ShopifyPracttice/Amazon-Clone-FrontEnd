import styled from "styled-components";
import AmazonMusicData from "./NavJsonComponents/AmazaonMusic.json"

const AmazonMusicComponent = styled.div`
h3{
    padding-left: 20px;
}
.amazon__music__div{
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

const AmazonMusic = () => {
    return ( 
        <AmazonMusicComponent>
         <h3>Stream Music</h3>
         <div className="amazon__music__div">
            {AmazonMusicData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </AmazonMusicComponent>
     );
}
 
export default AmazonMusic;