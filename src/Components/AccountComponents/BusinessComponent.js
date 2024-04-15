import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessComponentStyled = styled.div`
  display: grid;
  height: 100vh;
  padding: 20px;
  place-items: center;
   .business__account__details{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
     .business__account__orders{
         border: 1px solid #ddd;
         padding: 10px;
         width: 20%; 
        text-align: center;
         border-radius: 12px;
         p{
          font-size: 20px;
          font-weight: 500;
          text-align: center;
         }
     }
     .business__account__revenue{
        width: 30%;
        padding: 10px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #ddd;
        p{
          font-size: 20px;
          font-weight: 500;
          text-align: center;
         }
     }
     .business__account__completed__orders{
        padding: 10px;
        border-radius: 12px;
        width: 30%;
        text-align: center;
        border: 1px solid #ddd;
        p{
          font-size: 20px;
          font-weight: 500;
          text-align: center;
         }
     }
   }
   .business__account__sales__month{
    width:90%;
    h1{
        margin-left: 50px;
        font-weight: 400;
    }
   }
   table{
    padding: 10px;
    thead{
     th{
      max-width: 150px;
      padding: 6px;
      border: 1px solid black;
     }
    }tbody{
      td{
        text-transform: capitalize;
        text-align: center;
       max-width: 150px;
       border: 1px solid black;
       padding: 6px;
       p{
        margin-left: 40px;
       }
      }
    }
   }
  `
  const data = [
    {
      month: 'january',
      orders: 0,
      revenue: 0,
    },
    {
      month: 'febraury',
      orders: 0,
      revenue: 0,
    },
    {
        month: 'march',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'april',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'may',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'june',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'july',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'august',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'september',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'october',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'november',
        orders: 0,
        revenue: 0,
      },
      {
        month: 'december',
        orders: 0,
        revenue: 0,
      }
    
  ];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  

const BusinessComponent = () => {
  const navigate = useNavigate();
    const [graphData, setGraphData] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [maxRevenue, setMaxRevenue] = useState(0)
    const [myOrders, setMyOrders] = useState([])
    const [userType, setUserType] = useState("")
    const [userId, setUserId] = useState("")
    
    // console.log(maxRevenue);

    useEffect(()=>{
      const fetchCustomerID = async () => {
        try {
            const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/user/validate-token", {
                withCredentials: true,
            });
            setUserId(response.data.userId)
            setUserType(response.data.userType);
        } catch (error) {
            if ( error.response.data.message === "Token expired") {
                navigate("/login/customer")
            } else if(error.response.data.message === "Unauthorized"){
                console.log(error);
    toast.error(error.response.data.message);

            }else{
                console.log(error);
    toast.error(error.response.data.message)

            }
        }
    };
      const fetchOrderedProducts = async ()=>{
        try{
          if(userId){
            const response = await axios.get(`https://amazon-clone-backend-wofw.onrender.com/user/purchased-products/${userId}`)
            console.log(response);
            setMyOrders(response.data)
            setTotalOrders(response.data.length)
            let totalRevenue = 0;
            response.data.forEach((order) => {
              order.products.forEach((product) => {
                totalRevenue += product.productPrice - (product.productRetailPrice * product.productQuantity);
                // console.log(product.productPrice, product.productRetailPrice);
              });
            });
          // console.log(response.data.products);
            //  console.log(totalRevenue);
          setMaxRevenue(totalRevenue);
          const salesData = Array.from({ length: 12 }, (_, i) => ({ month: months[i], revenue: 0 }));
        response.data.forEach((order) => {
          order.products.forEach((product) => {
            const month = new Date(order.createdAt).getMonth(); 
            salesData[month].revenue += product.productPrice - (product.productRetailPrice * product.productQuantity);
          });
        });
        setGraphData(salesData);
          }

          
        }catch(err){
          console.log(err);
        }
             
      }
      fetchCustomerID()
      fetchOrderedProducts()
      }, [userId])
    return ( 
        <BusinessComponentStyled>
            <div className="business__account__details">
          <div className="business__account__orders">
            <h1>Total Orders</h1>
            <p>{totalOrders}</p>
          </div>
          <div className="business__account__revenue">
            <h1>Total Revenue</h1>
            <p>${maxRevenue}</p>   
          </div>
          <div className="business__account__completed__orders">
            <h1>Completed Orders</h1>
            <p>{totalOrders}</p>
          </div>
          </div>
          <table>
      <thead>
        <tr>
          {/* <th>Order ID</th>
          <th>Customer ID</th>
          <th>Payment Intent ID</th> */}
          <th>Product Name</th>
          <th>Product Brand</th>
          <th>Product Price</th>
          <th>Product Retail Price</th>
          <th>Product Quantity</th>
          <th>Product Color</th>
          <th>Product Size</th>
          <th>Product Profit</th>
          {/* <th>subTotal</th> */}
          {/* <th>Total</th> */}
          {/* <th>Payment Status</th> */}
          {/* <th>hostedInvoiceUrl</th> */}
        </tr>
      </thead>
      <tbody>
        {/* {myOrders.map((order, index) => {
          return(
          (
            order.products.map((product)=>(
           <tr>
            <td>{product.productName}</td>
            <td>{product.productBrand}</td>
            <td>{product.productPrice}</td>
            <td>{product.productRetailPrice}</td>
            <td>{product.productQuantity}</td>
            <td>{product.productColor}</td>
            <td>{product.productSize}</td>

           </tr>   
            ))
          )

          )
})} */}
{myOrders.map((order, index) => {
      return(
      (order.products.map((product, idx) => (
        <tr key={idx}>
          <td>{product.productName}</td>
          <td>{product.productBrand}</td>
          <td>${product.productPrice}</td>
          <td>${product.productRetailPrice}</td>
          <td>{product.productQuantity}</td>
          <td>{!product.productColor || product.productColor === "" ? "N/A": <p style={{width: "25px", height: "25px", borderRadius: "50%", background: product.productColor}}></p>}</td>
          <td>{!product.productSize || product.productSize === ""? "N/A": product.productSize}</td>
          <td> ${product.productPrice - (product.productRetailPrice * product.productQuantity) }</td>
          {/* Add empty cells for invoice details */}
             </tr>
      ))))
      })}
      </tbody>
    </table>
          <div className="business__account__sales__month">
            <h1>Sales Over Month</h1>
          <ResponsiveContainer width="100%" height={300} aspect={8}>
        <BarChart
          width={500}
          height={300}
          data={graphData.length > 0 ? graphData: data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, maxRevenue]} />
          <Tooltip />
          <Bar dataKey="name" fill="#8884d7"/>
          <Bar dataKey="orders" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

          </div>
        </BusinessComponentStyled>
     );
}
 
export default BusinessComponent;