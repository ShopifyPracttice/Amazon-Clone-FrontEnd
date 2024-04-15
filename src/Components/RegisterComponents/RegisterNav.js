import styled from "styled-components";

const RegisterNavComponent = styled.div`
background: #001f3c;
width: 100%;
// padding: 6px;
height: 50px;
display: flex;
justify-content: space-around;
align-items: center;
text-transform: capitalize;
ul{
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    gap: 10px;
    color: #fff;
}
ul li{
    display: flex;
    text-transform: capitalize;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    gap: 4px;
}
li p{
    width: 25px;
    height: 25px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 2px solid #fff;
}
img{
    width: 160px;
    height:40px;
}

`

const RegisterNav = ({activeForm}) => {
    return ( 
    <RegisterNavComponent>
        <div>
            <img src="data:image/png;base64,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" alt="businesslogo"/>
        </div>
        <div>
         <ul>
            <li><p style={{ background: 'white', color: "#001f3c"}}>{activeForm === 1 ? "1": <span> &#10003; </span> }</p> Account Creation</li>
            <li><p style={{ background: activeForm === 2 ? 'white' : 'transparent', color: activeForm === 2 ? "#001f3c": "white" }}>2</p> Business Details</li>
            {/* <li><p style={{ background: activeForm === 3 ? 'white' : 'transparent', color: activeForm === 3 ? "#001f3c": "white" }}>3</p>Finish</li> */}
         </ul>
        </div>
    </RegisterNavComponent>
     );
}
 
export default RegisterNav;