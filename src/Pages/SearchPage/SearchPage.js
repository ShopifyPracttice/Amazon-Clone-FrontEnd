import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import * as React from 'react';
import TemporaryDrawer from "../../Components/NavComponents/TemporaryDrawer";
import MainNav from "../../Components/Navbar/MainNav";
import Navbar from "../../Components/Navbar/Navbar";
import CartDrawerComponent from '../../Components/CartComponents/CartDrawerComponent';


const SearchPage = () => {
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false)
    return ( 
        <>
        <Navbar setOpenCart={setOpenCart}/>
        <MainNav setOpen={setOpen}/>
        <CartDrawerComponent openCart={openCart} setOpenCart={setOpenCart}/>
        <TemporaryDrawer open={open} setOpen={setOpen}/>
        <SearchComponent/>

        </>
     );
}
 
export default SearchPage;