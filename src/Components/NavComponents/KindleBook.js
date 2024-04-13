import styled from "styled-components";
import KindleBooksData from "./NavJsonComponents/KindleBooks.json"
import KindleStoreData from "./NavJsonComponents/KindleStore.json"


const KindleBookComponent = styled.div`
h3{
    padding-left: 20px;
}
.kindle__books__div{
    border-bottom: 1px solid #eee;
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

const KinldeBooks = () => {
    return ( 
        <KindleBookComponent>
        <h3>Kindle E-readers</h3>
         <div className="kindle__books__div">
            {KindleBooksData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
         <h3>Kindle Store</h3>
         <div className="kindle__books__div">
            {KindleStoreData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </KindleBookComponent>
     );
}
 
export default KinldeBooks;