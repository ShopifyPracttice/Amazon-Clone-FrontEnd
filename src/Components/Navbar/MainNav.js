import styled from "styled-components"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MainNavComponents = styled.div`
background: #232f3e;
display: flex;
height: 40px;
gap: 15px;
justify-content: flex-start;
align-items: center;
padding-left: 10px;
padding-right: 10px;
.main__nav{
    display: flex;
    border: 1px solid transparent;
    align-items: center;
    gap: 4px;
    color: #fff;
    padding:6px;
    cursor: pointer;
}
.main__nav:hover{
    border: 1px solid #fff;
}
.main__nav__li{
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    p{
        padding: 6px;
        border: 1px solid #232f3e;
        cursor: pointer;
    }
    p:hover{
        border: 1px solid #fff;
    }
}

`

const MainNav = ({setOpen}) => {
    return ( 
        <MainNavComponents>
         <div className="main__nav" onClick={(e)=>setOpen(true)}>
            <MenuOutlinedIcon/>
            <span>All</span>
         </div>
         <div className="main__nav__li">
            <p>Today's Deals</p>
            <p>Customer Service</p>
            <p>Registry</p>
            <p>Gift Cards</p>
            <p>Sell</p>
         </div>
        </MainNavComponents>
     );
}
 
export default MainNav;