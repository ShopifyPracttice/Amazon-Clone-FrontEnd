import * as React from 'react';
import CustomerComponent from "../../Components/AccountComponents/CustomerComponent";
import MainNav from "../../Components/Navbar/MainNav";
import Navbar from "../../Components/Navbar/Navbar";
import TemporaryDrawer from '../../Components/NavComponents/TemporaryDrawer';

const CustomerAccount = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
        <Navbar />
        <MainNav setOpen={setOpen}/>
        <TemporaryDrawer open={open} setOpen={setOpen}/>
        <CustomerComponent/>
        </>
      );
}
 
export default CustomerAccount;