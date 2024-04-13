import CategoryComponent from "../../Components/CategoryComponents/CategoryComponent";
import * as React from 'react';
import TemporaryDrawer from "../../Components/NavComponents/TemporaryDrawer";
import MainNav from "../../Components/Navbar/MainNav";
import Navbar from "../../Components/Navbar/Navbar";
import CartDrawerComponent from '../../Components/CartComponents/CartDrawerComponent';


const CategoryPage = () => {
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false)

    return (
        <> 
        <Navbar setOpenCart={setOpenCart}/>
        <CartDrawerComponent openCart={openCart} setOpenCart={setOpenCart}/>
        <MainNav setOpen={setOpen}/>
        <TemporaryDrawer open={open} setOpen={setOpen}/>
        <CategoryComponent/>
        </>
     );
}
 
export default CategoryPage;