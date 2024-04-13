import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { motion, useMotionValue, useTransform } from "framer-motion"

const CircularProgress = ({ progress }) => {
    const circleLength = useTransform(progress, [0, 100], [0, 1])
    const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
    const circleColor = useTransform(
      progress,
      [0, 95, 100],
      ["#FFCC66", "#FFCC66", "#66BB66"]
    )
  
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 258 258"
      >
        {/* Check mark  */}
        <motion.path
          transform="translate(60 85)"
          d="M3 50L45 92L134 3"
          fill="transparent"
          stroke="#7BB86F"
          strokeWidth={8}
          style={{ pathLength: checkmarkPathLength }}
        />
        {/* Circle */}
        <motion.path
          d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
          fill="transparent"
          strokeWidth="8"
          stroke={circleColor}
          style={{
            pathLength: circleLength
          }}
        />
      </motion.svg>
    )
  }
// Define animation keyframes
// Styled component for the success message container
const SuccessContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  button{
    border: none;
    background: green;
    color: #fff;
    padding: 10px;
    font-weight: 650;
    border-radius: 6px;
    cursor: pointer;
    a{
        text-decoration: none;
        color: #fff;
        padding: 13px;
    }
    &:hover{
        background: lightgreen;
    }
  }
`;



const SuccessComponent = () => {
//   const navigate = useNavigate();
  let progress = useMotionValue(90)
//   useEffect(() => {
//     // Use setTimeout to redirect after 5 seconds
//     const redirectTimer = setTimeout(() => {
//       navigate('/'); // Redirect to the main page
//     }, 5000);

//     // Clear the timer when the component unmounts
//     return () => clearTimeout(redirectTimer);
//   },[navigate]);

  return (
    <SuccessContainer>
      {/* Add any additional content or animation here */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress }}
        transition={{ duration: 1 }}
      />
      <CircularProgress progress={progress}/>
      <h1>Payment Successful!</h1>
      <h2>Your Order has been Booked & will be deliver to you shortly!</h2>
      <button><Link to="/">Continue Shopping</Link></button>
    </SuccessContainer>
  );
};

export default SuccessComponent;
