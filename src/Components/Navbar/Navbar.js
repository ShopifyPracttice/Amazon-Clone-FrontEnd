import { useEffect, useState} from "react";
import styled from "styled-components";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavbarComponent = styled.div`
background: #131921;
width: 100%;
position: relative;
.navbar__signIn{
    width: 7.8%;
    color: #fff;
    margin-right: 10px;
    // padding: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    position: relative;
    p{
        font-size: 12px;
        margin-bottom: -6px;
        margin-left: 2px;
        height: 20px;
        overflow: hidden;
    }
    h5{
        margin-top: 6px;
        margin-left: 2px;
    }
}
.navbar__signIn:hover{
    border: 1px solid #ddd;
}
.navbar__signIn:hover .nav__sigin__hover__div{
    display: grid;
}
.nav__sigin__hover__div{
    // display: none;
    display: ${(props) => (props.signhover ? "grid" : "none")};
    position: absolute;
    top: 50%;
    left: 72%;
    height: 100%;
    background: #fff;
    box-shadow: -2px 6px 5px 0px rgba(196,177,177,0.75);
-webkit-box-shadow: -2px 6px 5px 0px rgba(196,177,177,0.75);
-moz-box-shadow: -2px 6px 5px 0px rgba(196,177,177,0.75);
    width: 200px;
    place-items: center;
    button{
        width: 100%;
        background: #FFD814;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 6px;
    }
    a{
        text-decoration: none;
        color: black;
        margin-left: 50px;
    }
    p{
        font-size: 14px;
    }
}
.navbar{
    display: flex;
    align-items: center;
    padding: 4px;
}
img{
    cursor: pointer;
    width: 150px;
}
.navbar__location{
    display: flex;
    height: 60px;
    width: 120px;
    justify-content: center;
    align-items: center;
    color: #fff;
    span{
        font-size: 14px;
    }
}
.navbar__input__section{
    width: 50%;
    display: flex;
    z-index: 10;

    input{
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
    }
    span{
        width: 60px;
        background:#FFD814;
        height: 40px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        display: grid;
        place-items: center;
    }
    span:hover{
        background: #cca400;
    }
    select{
        width: 140px;
        height: 40px;
        border-top-left-radius: 6px;
        color: #0F1111;
        cursor: pointer;
        background: #eee;
        padding: 10px;
        border-bottom-left-radius: 6px;
        option{
            background: #fff;
        }
        outline: none;
        border: none;
    }
}
.navbar__language{
    img{
        width: 20px;
        margin-right: 5px;
    }
    color: #fff;
    padding: 20px;
}

.navbar__orders{
    border: 1px solid transparent;
    padding: 4px;
    width: 6%;
    display: grid;
    place-items: center;
    text-align: start;
    cursor: pointer;
    &:hover{
        border: 1px solid #fff;
    }
}
.navbar__orders{
    p{
        font-size: 12px;
        margin-bottom: -6px;
    }
    h5{
        margin-top: 6px;
    }
    color: #fff;
}
.navbar__cart{
    color: #fff;
    width: 10%;
    height: 60px;
    display: grid;
    align-items: center;
    font-weight: 700;
    border: 1px solid transparent;
    cursor: pointer;
    place-items: center;
    position: relative;
    p{
        position: absolute;
        top: -34%;
        left: 31%;
        border-radius: 50%;
        padding: 2px;
        // background: #fff;
        color: #f08804;
        font-weight: 700;

    }
    &:hover{
        border: 1px solid #fff;
    }
}
.nav__ur__products{
    width: 6%;
    height: 60px;
    color: #fff;
    font-size: 12px;
    display: flex;
    cursor: pointer;
    padding: 4px;
    display: grid;
    // place-items: center;
    // height: 70px;
    border: 1px solid transparent;
    p{
        margin-top: 0px;
    }
    span{
        margin-top: -18px;
    }
}
.nav__ur__products:hover{
    border: 1px solid #fff;
}
.nav__dashboard{
    width: 6%;
    height: 60px;
    cursor: pointer;
    color: #fff;
    font-size: 12px;
    padding: 4px;
    display: grid;
    border: 1px solid transparent;
    p{
        margin-top: 0px;
    }
    span{
        margin-top: -18px;
    }
}
.nav__dashboard:hover{
    border: 1px solid #fff;
}
.overlay{
    display: ${(props) => (props.displayoverlay ? "block" : "none")};
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.search__result{
    display: ${(props) => (props.displayoverlay ? "block" : "none")};
    background: #fff;
    width: 38%;
    // padding: 10px;
    height: auto;
    position: absolute;
    top: 75.8%;
    left: 30.4%;
    z-index: 100;
    border-radius: 6px;
}
.search__result__name{
    width: 100%;
    padding: 10px;
    background: #fff;
    cursor: pointer;
    a{
        text-decoration: none;
        color: #000;
    }
}
.search__result__name:hover{
    background: #eee;
}
`

const selectOptions = [
    {value: "all", option: "All Departments"},
    {value: "arts", option: "Arts & Crafts"},
    {value: "automotive", option: "Automotive"},
    {value: "baby", option: "Baby"},
    {value: "beauty", option: "Beauty & Personal Care"},
    {value: "books", option: "Books"},
    {value: "boys-fashion", option: "Boy's Fashion"},
    {value: "computer", option: "Computer"},
    {value: "digital-music", option: "Digital Music"},
    {value: "electronics", option: "Electronics"},
    {value: "girls-fashion", option: "Girl's Fashion"},
    {value: "health", option: "Health & Household"},
    {value: "home-kitchen", option: "Home & Kitchen"},
    {value: "industrial", option: "Industrial & Scientific"},
    {value: "kindle-store", option: "Kindle Store"},
    {value: "luggage", option: "Luggage"},
    {value: "mens-fashion", option: "Men's Fashion"},
    {value: "movies-tv", option: "Movies & TV"},
    {value: "music-cd", option: "Music, CD & Vinyl"},
    {value: "pet-supplies", option: "Pet Suplies"},
    {value: "sports", option: "Sports & OutDoors"},
]

const Navbar = ({setOpenCart}) => {
    const [signHover, setSignHover] = useState(false)
    const [productTitles, setProductsTitles] = useState([])
    const [displayOverlay, setDisplayOverlay] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const navigate = useNavigate();
    const [userType, setUserType]= useState("")
    const [error, setError] = useState("")
    const [itemCounter, setItemCounter] = useState(0)
    const [userName, setUserName] = useState("")    
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/user/validate-token", {
                    withCredentials: true,
                });
                setUserType(response.data.userType);
                setUserName(response.data.userName);
                setItemCounter(response.data.cartItems);
            } catch (error) {
                if (error.response.data.message === "Token expired") {
                    navigate("/login/customer");
                } else if (error.response.data.message === "Unauthorized") {
                    setError(error.response.data.message);
                } else {
                    console.error(error);
                }
            }
        };
    

    
        const fetchData = async () => {
            await fetchCustomerData();
        };
    
        // Fetch data initially
        fetchData();
    
        // Polling interval in milliseconds (e.g., every 5 seconds)
        const pollingInterval = 5000; // 5 seconds
    
        // Set up polling using setInterval
        const intervalId = setInterval(fetchData, pollingInterval);
    
        // Clean up setInterval when component unmounts or changes
        return () => clearInterval(intervalId);
    }, [userType]);
    useEffect(()=>{
        const fetchProductData = async () => {
            try{
                const response = await axios.get("https://amazon-clone-backend-wofw.onrender.com/product/all-products");
                setProductsTitles(response.data);   
            }
            catch(err){
                // console.log(err);
                 toast.error(err.response.data.message)
            }
        }
        fetchProductData()
    },[])    
    useEffect(() => {
        const handleClickOutside = (event) => {
          const inputSection = document.querySelector('.navbar__input__section');
          const searchSection = document.querySelector('.search__result');
          
          // Ensure inputSection and searchSection exist before accessing them
          if (searchSection?.contains(event.target) || inputSection?.contains(event.target)) {
            return;
          }
          setDisplayOverlay(false);
          
          // Click occurred outside, close the overlay
        };
      
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      useEffect(() => {
        const handleClickOutside = (event) => {
          const hoverSection = document.querySelector('.nav__sigin__hover__div');
          const navSection = document.querySelector('.navbar__signIn');
          
          // Ensure inputSection and searchSection exist before accessing them
          if (navSection?.contains(event.target) || hoverSection?.contains(event.target)) {
            return;
          }
          setSignHover(false);
          
          // Click occurred outside, close the overlay
        };
      
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      const signOut = async () => {
        try {
            await axios.post(
                `https://amazon-clone-backend-wofw.onrender.com/user/logout`,
                {},
                { withCredentials: true }
            );
            // Redirect to login page after successful logout
            navigate("/login/customer");
        } catch (error) {
            console.error("Error during sign out:", error);
            toast.error("Error during sign out");
        }
    };
    
      const filterProducts = (search) => {
        // Filter by productName
        const filteredName = productTitles.filter(item => item.productName.toLowerCase().includes(search.toLowerCase()));
    
        // If no matches based on productName, filter by productBrand
        if (filteredName.length === 0) {
            const filteredBrand = productTitles.filter(item => item.productBrand.toLowerCase().includes(search.toLowerCase()));
            
            // If no matches based on productBrand, filter by productCategory
            if (filteredBrand.length === 0) {
                const filteredCategory = productTitles.filter(item => item.productCategory.toLowerCase().includes(search.toLowerCase()));
                return filteredCategory;
            } else {
                return filteredBrand;
            }
        } else {
            return filteredName;
        }
    };
    const filteredData = filterProducts(search);
    // console.log(filteredData);

    //   const filteredData = productTitles.filter(item => 
    //     item.productName.toLowerCase().includes(search.toLowerCase()) || 
    //     item.productBrand.toLowerCase().includes(search.toLowerCase()) || 
    //     item.productCategory.toLowerCase().includes(search.toLowerCase())
    // );
    
    // const filteredName = productTitles.filter(item => item.productName.includes(search));
    // const filteredBrand = productTitles.filter(item => item.productBrand.includes(search));
    // const filteredCategory = productTitles.filter(item => item.productCategory.includes(search));
    const handleSignInClicks = () => {
        if (error === "Unauthorized") {
            navigate("/login/customer");
        } else if (userType === "customer") {
            // navigate("/customer-account");
            setSignHover(true)
        } else if (userType === "business") {
            navigate("/business-account");
        }
    };

    return ( 
        <NavbarComponent displayoverlay={displayOverlay} signhover={signHover}>
            <div className="overlay">

            </div>
            {displayOverlay && search !== "" ? (
    <div className="search__result">
        {filteredData.length !== 0 && filteredData.map((search)=>(
            <div key={search._id } className="search__result__name" onClick={()=>{
                navigate(`/product/${search._id}`)
                setDisplayOverlay(false)
                }}>
              <Link to={`/product/${search._id}`}>{search.productName}</Link>
            </div>
        )) }
      </div>      
          
) : null}

           <div className="navbar"
            // onClick={() => navigate("/")}
            >
            {userType === "business" ?(
               <img onClick={()=> navigate("/")} src="data:image/png;base64,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" alt="businesslogo"/>
            ):
             <img onClick={()=> navigate("/")} src="https://i.pinimg.com/originals/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.png" alt="amazon-logo"/>           

            }
             <div className="navbar__location">
                  <p><LocationOnOutlinedIcon/></p>
                  <div style={{height: "40px"}}>
                     <span >Deliver to</span>
                     <h5 style={{marginTop: "-2px"}}>Pakistan</h5>
                  </div>
             </div>
             <div className="navbar__input__section">
                    <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                        {selectOptions.map((opt, idx) => (
                            <option key={idx} value={opt.value}>{opt.option}</option>
                        ))}
                    </select>
                    <input type="text" onClick={()=>setDisplayOverlay(true)} placeholder="Search Amazon" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <span onClick={()=>{
                      if(search !==""){
                        navigate(`/search/${selectedCategory}/${search}`)
                        setDisplayOverlay(false)
                      } 
                        }}><SearchIcon/></span>
             </div>
             <div className="navbar__language">
               <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png" alt="us-logo"/>
               <span>EN</span>
             </div>
             <div className="navbar__signIn" onClick={handleSignInClicks}>
              <p>Hello {userName ==="" ? "Signin": userName}</p>
              <h5>Account & Lists</h5>
             </div>
             <div className="nav__sigin__hover__div">
                   {
                    userType === "" ?(
                    <div>
                        <Link to="/login/customer"><button>Sign in</button></Link>
                        <p>New Customer <Link to="/register/customer-account">Start here</Link></p>
                    </div>):(
                      <div>
                        {userType === "customer"? <Link to="/customer-account">Home</Link>: <p></p> }
                         <button onClick={signOut}>Logout</button>
                      </div>    
                    )}  
             </div>
             {
             userType === "business"? (
             <>
             <div className="nav__ur__products" onClick={()=>navigate("/business/add-product")}>
              <p> <AddCircleOutlineOutlinedIcon/> </p>
              <span>Add Products</span>
             </div>
             <div className="nav__dashboard" onClick={()=> navigate("/business-account") }>
             <p><DashboardCustomizeOutlinedIcon/></p>
             <span>DashBoard</span>
             </div>
             </>
             ):(
             <>
             <div className="navbar__orders" onClick={()=> navigate("/customer/order")}>
               <p>Returns</p>
               <h5>& Orders</h5>
             </div>
             <div className="navbar__cart" onClick={()=>setOpenCart(true)}>
              <span><ShoppingCartOutlinedIcon sx={{ fontSize: 30 }}/> Cart</span>
              <p>{itemCounter}</p>
             </div>
             </>
             )}
            </div>           
        </NavbarComponent>
     );
}
 
export default Navbar;