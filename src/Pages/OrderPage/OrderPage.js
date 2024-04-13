import * as React from 'react';
import TemporaryDrawer from "../../Components/NavComponents/TemporaryDrawer";
import MainNav from "../../Components/Navbar/MainNav";
import Navbar from "../../Components/Navbar/Navbar";
import CartDrawerComponent from '../../Components/CartComponents/CartDrawerComponent';
import OrderComponent from "../../Components/OrderComponent/OrderComponent";

const OrderPage = () => {
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false)

    return ( 
        <>
        <Navbar setOpenCart={setOpenCart}/>
        <MainNav setOpen={setOpen}/>
        <CartDrawerComponent openCart={openCart} setOpenCart={setOpenCart}/>
        <TemporaryDrawer open={open} setOpen={setOpen}/>
        <OrderComponent/>
        </>
     );
}
 
export default OrderPage;