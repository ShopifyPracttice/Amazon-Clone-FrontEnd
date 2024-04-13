import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
const CancelStyled = styled.div`
width: 100%;
display: grid;
margin-top: 100px;
// height: 100vh;
place-items: center;
color: #f44336;
text-align: center;
h2{
    transform: rotate(90deg);
    font-size: 24px;
}
h3{
    font-size: 24px;
    transform: rotate(90deg);
    margin-top: -40px;
}
`
    const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;    
const CrossIcon = styled.div`
display: inline-block;
border-radius: 50%;

width: 50px;
height: 50px;
border: 3px solid #f44336;
position: relative;

&::before,
&::after {
  content: '';
  position: absolute;
  width: 70%;
  height: 3px;
  background-color: #f44336;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
}

&::before {
  transform: rotate(45deg);
}

&::after {
  transform: rotate(-45deg);
}

// animation: ${rotate} 1s linear infinite;
`;
const CancelComponent = () => {
  const navigate = useNavigate();
    
  useEffect(() => {
    // Use setTimeout to redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/'); // Redirect to the main page
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(redirectTimer);
  },[navigate]);

    return (
        <CancelStyled> 
        <CrossIcon/>
        <h1>Payment Unsuccessful!</h1>
        <h2>:</h2>
        <h3>(</h3>
        </CancelStyled>
     );
}
 
export default CancelComponent;