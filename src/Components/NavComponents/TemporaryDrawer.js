import axios from "axios";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from "styled-components";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AmazonMusic from "./AmazonMusic";
import KinldeBooks from "./KindleBook";
import AmazonApp from "./AmazonApp";
import Electronics from "./Electronics";
import Computer from "./Computers";
import SmartHome from "./SmartHome";
import ArtsandCraft from "./ArtsandCraft";
import Automotive from "./Automotive";
import Baby from "./Baby";
import Beauty from "./Beauty";
import WomenFashion from "./WomenFashion";
import GirlsFashion from "./GirlsFashion";
import MensFashion from "./MensFashion";
import BoysFashion from "./BoysFashion";
import Health from "./Health";
import Luggage from "./Luggage";
import Movies from "./Movies";


const DrawerNavComponents = styled.div`
display: ${(props) => props.activeComponent=== "A" ? "block" : "none"};
.nav__content{
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding-left: 20px; 
  padding-right: 20px; 
  cursor: pointer;
  padding-top: 8px; 
  padding-bottom: 8px;
}
.nav__content__hide{
  display: ${(props) => props.departmentList ? "flex" : "none"};
  justify-content: space-between;
  align-items: center; 
  padding-left: 20px; 
  padding-right: 20px; 
  cursor: pointer;
  padding-top: 8px; 
  padding-bottom: 8px;
}
.nav__content__hide:hover{
  background: #eee;
}
.nav__content__hide__program{
  display: ${(props) => props.programList ? "flex" : "none"};
  justify-content: space-between;
  align-items: center; 
  padding-left: 20px; 
  padding-right: 20px; 
  cursor: pointer;
  padding-top: 8px; 
  padding-bottom: 8px;
}
.nav__content__hide__program:hover{
  background: #eee;

}
.nav__see__all{
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  padding-left: 20px; 
  padding-right: 20px; 
  cursor: pointer;
  padding-top: 8px; 
  padding-bottom: 8px;
}
.nav__see__all:hover{
  background: #eee;

}
.nav__content:hover{
   background: #eee;
}
`
const NavSubMenuComponent = styled.div`
display: ${(props) => props.activeComponent=== "B" ? "block" : "none"};
.nav__main__menu{
  display: flex;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  p{
    display: flex;
    gap: 10px;
    align-items: center;
  }
  p:hover{
    text-decoration: underline;
    cursor: pointer;
  }
}
.nav__main__menu: hover{
  background:#eee;
}

`

export default function TemporaryDrawer({open, setOpen}) {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("A")
  const [subMenu, setSubMenu] = useState("Amazon-Music")
  const [programList, setProgramList] = useState(false)
  const [departmentList, setDepartmentList] = useState(false)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("")    
  useEffect(() => {
    const fetchCustomerID = async () => {
        try {
            const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/user/validate-token", {
                withCredentials: true,
            });
            setUserName(response.data.userName);
        } catch (error) {
            if (error.response.status === 401 && error.response.data.message === "Token expired") {
                navigate("/login/customer")
            } else if(error.response.status === 401 && error.response.data.message === "Unauthorized"){
                setError(error.response.data.message)
            }
        }
    };

    fetchCustomerID();
}, []);

const renderComponent = () => {
   switch (subMenu) {
    case 'Amazon-Music':
      return (
        <div>
          <AmazonMusic />
        </div>
      );
    case 'Kindle-Books':
      return <KinldeBooks />;
    case 'Amazon-App':
      return (
        <div>
          <AmazonApp/>
        </div>
      );
      case "electronics":
      return <Electronics/>
      case "computers":
        return <Computer/>
      case "Smart-Home":
      return <SmartHome/>
      case "arts-craft":
        return <ArtsandCraft/>
      case "automotive":
          return <Automotive/>
      case "baby":
        return <Baby/>
      case "beauty":
        return <Beauty/> 
      case "women-fashion":
        return <WomenFashion/>
      case "girl-fashion":
      return <GirlsFashion/>    
      case "men-fashion": 
      return <MensFashion/>
      case "boy-fashion":
      return <BoysFashion/>
      case "health":
        return <Health/>
      case "luggage":
        return <Luggage/>
        case "movies":
        return <Movies/>
    default:
      return null;
  }
};

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
  
    return (
      <>
        <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 300 }} role="presentation">
          <div style={{ background: "#232f3e", color: "#fff",display: "flex",gap: "6px" ,justifyContent: "center", alignItems: "center"}}>
             <p style={{marginBottom: "10px", marginLeft: "-60px"}}><AccountCircleOutlinedIcon /></p>
              <p style={{fontSize: "18px", fontWeight: "700"}}>Hello, {userName ==="" ? "Signin": userName}</p>
          </div>
          <DrawerNavComponents departmentList={departmentList} programList={programList} activeComponent={activeComponent}>          

          <List>
            <h3 style={{fontSize: "20px", marginLeft: "20px"}}>Digital Content & Devices</h3>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("Amazon-Music")}} className="nav__content" >Amazon Music <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("Kindle-Books")}} className="nav__content" >Kindle E-readers & Books <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("Amazon-App")}}   className="nav__content" >Amazon Appstore <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
          </List>
          <Divider/>
          <List>
            <h3 style={{fontSize: "20px", marginLeft: "20px"}}>Shop by Department</h3>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("electronics")}}   className="nav__content">Electronics <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("computers")}}     className="nav__content" >Computer <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("Smart-Home")}}    className="nav__content" >Smart Home <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("arts-craft")}}    className="nav__content" >Art & Crafts <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("automotive")}}    className="nav__content__hide" >Automotive <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("baby")}}          className="nav__content__hide" >Baby <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("beauty")}}        className="nav__content__hide" >Beauty and Personal Care <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("women-fashion")}} className="nav__content__hide" >Women's Fashion <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("men-fashion")}}   className="nav__content__hide" >Men's Fashion <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("girl-fashion")}}  className="nav__content__hide" >Girl's Fashion <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("boy-fashion")}}   className="nav__content__hide" >Boys's Fashion <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("health")}}        className="nav__content__hide" >Health & Household <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("luggage")}}       className="nav__content__hide" >Luggage <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p onClick={()=>{setActiveComponent("B"); setSubMenu("movies")}}        className="nav__content__hide" >Movies & Telivision <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p className="nav__see__all" onClick={()=> setDepartmentList(!departmentList)}>See {departmentList? "less": "all"} <span style={{marginBottom: "-6px"}}>{departmentList?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}</span></p>    
          </List>
          <Divider/>
          <List>
            <h3 style={{fontSize: "20px", marginLeft: "20px"}}>Programs & Features</h3>
             <p className="nav__content" >Gift Cards <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p className="nav__content" >Shop by Interest</p>
             <p className="nav__content" >Amazon Live <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p className="nav__content" >International Shopping <span style={{marginBottom: "-6px"}}><ChevronRightOutlinedIcon/></span></p>
             <p className="nav__content__hide__program" >Amazon Second Chance</p>
             <p className="nav__see__all" onClick={()=> setProgramList(!programList)}>See {programList? "less": "all"} <span style={{marginBottom: "-6px"}}>{programList?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}</span></p>        
          </List>
          <Divider/>
          <List>
            <h3 style={{fontSize: "20px", marginLeft: "20px"}}>Help & Settings</h3>
             <p className="nav__content" >Your Account </p>
             <p className="nav__see__all" > <span style={{marginBottom: "-6px", color: "blue", marginRight: "10px"}}><LanguageOutlinedIcon/></span> English</p>
             <p className="nav__content" >Customer Service </p>
             <p className="nav__see__all" >Sin in</p>    
          </List>
          <Divider/>
          </DrawerNavComponents>
          <NavSubMenuComponent activeComponent={activeComponent}>
            <div className="nav__main__menu" onClick={()=> setActiveComponent("A")}>
              <p><span><ArrowBackOutlinedIcon/></span><h5>MAIN MENU</h5></p>
            </div>
            <Divider/>
            {renderComponent()}
          </NavSubMenuComponent>
          </Box>
        </Drawer>
      </>
    );
  }

