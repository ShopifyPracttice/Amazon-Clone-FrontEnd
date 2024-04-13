import React from 'react';
import BusinessComponent from '../../Components/AccountComponents/BusinessComponent';
import Navbar from '../../Components/Navbar/Navbar';
import MainNav from '../../Components/Navbar/MainNav';
import TemporaryDrawer from '../../Components/NavComponents/TemporaryDrawer';

const BusinessAccount = () => {
  const [open, setOpen] = React.useState(false);

    return ( 
        <>
         <Navbar/>
         <MainNav setOpen={setOpen}/>
         <TemporaryDrawer open={open} setOpen={setOpen}/>         
         <BusinessComponent/>
        </>
     );
}
 
export default BusinessAccount;