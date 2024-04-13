import styled from "styled-components";

const AccountOptionComponent = styled.div`
 width: 90%;
 height: ${(props) => props.height};
 padding: 14px;
 border: 1px solid #ddd;
 cursor: pointer;
 border-radius: 12px;
 .customer__account__option{
    display: flex;
    gap: 10px;
    align-items: self-start;
    img{
        width: 70px;
        // margin-top: 20px;
        // border-radius: 12px;
    }
    .customer__account__option__text{
        // height: 100px;
    }
    h3{
        font-weight: 400;
        font-size: 18px;
        margin-top: -6px;
    }
    p{
        font-size: 14px;
        margin-top:-8px;
    }
 }
 &:hover{
    background:#eee;
 }
`

const AccountOption = ({imgSrc,altImg ,title, description, height}) => {
    return ( 
        <AccountOptionComponent height={height}>
           <div className="customer__account__option">
             <img src={imgSrc} alt={altImg}/>
             <div className="customer__account__option__text">
               <h3>{title}</h3>
               <p>{description}</p>
             </div>
           </div>
        </AccountOptionComponent>
             );
}
 
export default AccountOption;