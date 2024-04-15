import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './Pages/RegisterPages/Register';
import BusinessInfo from './Pages/RegisterPages/BusinessInfo';
import BusinessRegisterPage from './Pages/RegisterPages/BusinessRegisterPage';
import LoginCustomer from './Pages/LoginPages/LoginCustomer';
import LoginBusiness from './Pages/LoginPages/LoginBusiness';
import HomePage from './Pages/HomePages/HomePage';
import CustomerAccount from './Pages/AccountPages/CustomerAccount';
import BusinessAccount from './Pages/AccountPages/BusinessAccount';
import AddProduct from './Pages/AddProductPage/AddProduct';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import CartDrawer from './Pages/CartPages/CartDrawer';
import Success from './Pages/PaymentPages/Success.';
import Cancel from './Pages/PaymentPages/Cancel';
import OrderPage from './Pages/OrderPage/OrderPage';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isUserCustomer, setIsUserCustomer] = useState(true);
  const [isUserBusiness, setIsUserBusiness] = useState(true);
   
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get('https://amazon-clone-backend-wofw.onrender.com/user/validate-token', {
          withCredentials: true,
        });

        if (response.status === 200) {
          if (response.data.userType === 'customer') {
            setIsUserBusiness(false)
            setIsUserCustomer(true);
          } else if (response.data.userType === 'business') {
            setIsUserBusiness(true);
            setIsUserCustomer(false)
          }
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
      // window.location.reload();

    };

    fetchUserData();
  }, [isAuthorized, isUserBusiness, isUserCustomer]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/customer/order" element={<OrderPage/>} />
          <Route path="/cancel" element={<Cancel/>} />
          {/* <Route path="/search=:searchQuery" element={<SearchPage/>} /> */}
          <Route path="/search/:searchCategory/:searchQuery" element={<SearchPage />} />
          {/* <Route path="/business/add-product" element={<AddProduct/>} /> */}
          <Route path="/login/customer" element={<LoginCustomer />} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/all-products" element={<CategoryPage/>} />
          <Route path="/login/business" element={<LoginBusiness />} />
          <Route path="/register/customer-account" element={<Register />} />
          <Route path="/register/business-account/:email" element={<BusinessInfo />} />
          <Route path="/register/business-account" element={<BusinessRegisterPage />} />

          <Route path="/business/add-product" element={<AddProduct/>} />
          <Route path="/business-account" element={<BusinessAccount />} />
          <Route path='/customer-account' element={<CustomerAccount/>}/>
          <Route path='*' element={<Navigate to="/" replace />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
