import * as React from 'react';
import HomeComponent from "../../Components/HomeComponents/HomeComponent";
import TemporaryDrawer from "../../Components/NavComponents/TemporaryDrawer";
import MainNav from "../../Components/Navbar/MainNav";
import Navbar from "../../Components/Navbar/Navbar";
import CartDrawerComponent from '../../Components/CartComponents/CartDrawerComponent';


const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false)

    return ( 
        <>
        <Navbar setOpenCart={setOpenCart}/>
        <MainNav setOpen={setOpen}/>
        <CartDrawerComponent openCart={openCart} setOpenCart={setOpenCart}/>
        <TemporaryDrawer open={open} setOpen={setOpen}/>
        <HomeComponent/>
        </>
     );
}
 
export default HomePage;