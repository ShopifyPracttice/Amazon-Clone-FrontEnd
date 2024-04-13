import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryLoader from "../CategoryComponents/CategoryLoader";
const SearchStyledComponent = styled.div`
.search__query{
    box-shadow: 2px 4px 5px 0px #ddd;
    -webkit-box-shadow: 2px 4px 5px 0px #ddd;
    -moz-box-shadow: 2px 4px 5px 0px #ddd;
    text-transform:capitalize;
    span{
        color: #c45500;
    }
}
.search__result{
    h1{
        font-weight: 500;
        font-size: 30px;
    }
    h3{
        color: #999;
        font-weight: 500;
        font-size: 18px;        
    }
}
.filter__product{
    display: flex;
    width: 99%;
    gap: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    h3{
        font-weight: 300;
        color: #333;
    }
    img{
        width: 250px;
        height: 250px;
        object-fit: contain;
        // background: #eee;
    }
    h4{
        font-size: 24px;
        font-weight: 450;
    }
    button{
        background: #F0B800;
        cursor: pointer;
        border:none;
        padding: 5px;
        border-radius: 6px;
        a{
            text-decoration: none;
            color: #000;
        }
    }

}
`

const SearchComponent = () => {
    const PAGE_SIZE = 5;
    const { searchQuery } = useParams();
    const {searchCategory} = useParams()
    const [searchProduct, setSearchProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(
                "https://amazon-clone-backend-wofw.onrender.com/product/all-products"
            );
            setSearchProduct(response.data);
        };
        fetchProduct();
    }, []);
    // useEffect(() => {
    //     const filteredCategory = searchProduct.filter((item) =>
    //       item.productCategory.includes(searchCategory)
    //     );
    //     if (filteredCategory.length === 0) {
    //       setCurrentPage(0);
    // const filteredName = searchProduct.filter(item => item.productName.includes(search));
    //       setProductsToShow(filteredName)
    //     }
    //   }, [searchProduct, searchCategory]);
    
    // useEffect(() => {
    //     let filteredProducts;
    //     if (searchCategory === "all") {
    //       filteredProducts = searchProduct.filter((item) =>
    //         item.productName.includes(searchQuery)
    //       );
    //     } else {
    //       filteredProducts = searchProduct.filter((item) =>
    //         item.productCategory.includes(searchCategory)
    //       );
    //     }
    //     setProductsToShow(filteredProducts);
    //     console.log(filteredProducts);
    //   }, [searchProduct, searchCategory, searchQuery]);
    
    //   useEffect(() => {
    //     let filteredProducts;
    //     if (searchCategory === "all") {
          
    //     } else {
    //       filteredProducts = searchProduct.filter((item) =>
    //         item.productCategory.includes(searchCategory)
    //       );
    //     }
    //     setProductsToShow(filteredProducts);
    //     console.log(filteredProducts);
    //   }, [searchProduct, searchCategory, searchQuery]);
    const filteredCategory = searchProduct.filter(item => item.productCategory.includes(searchCategory))

    const filterProducts = (search) => {
          const filteredName = searchProduct.filter(item => item.productName.toLowerCase().includes(search.toLowerCase()));
    
         if (filteredName.length === 0) {
            const filteredBrand = searchProduct.filter(item => item.productBrand.toLowerCase().includes(search.toLowerCase()));
            
            if (filteredBrand.length === 0) {
                const filteredCategory = searchProduct.filter(item => item.productCategory.toLowerCase().includes(search.toLowerCase()));
                return filteredCategory;
            } else {
                return filteredBrand;
            }
        } else {
            return filteredName;
        }
    };
    const filteredData = filterProducts(searchQuery);
    let totalPages
    if(searchCategory === "all"){
         totalPages = Math.ceil(filteredData.length / PAGE_SIZE);    
    }else{
         totalPages = Math.ceil(filteredCategory.length / PAGE_SIZE);    
    }
    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return ( 
        <SearchStyledComponent>
            <div className="search__query">
                <p>{filteredData.length === 0 && filteredCategory.length === 0 || searchProduct.length === 0 ? 0 :currentPage}-{totalPages} of {searchCategory === "all"? filteredData.length  :filteredCategory.length} results for "<span>{searchQuery}</span>" in {searchCategory === "all"? "All-Categories": searchCategory} </p>             
            </div>
            <div className="search__result">
                <h1>Results</h1>
                <h3>Check each product page for other buying options.</h3>
                {/* {filteredCategory.length > 0 && filteredCategory.map((product)=>(
                    <div key={product._id}>
                        <p>{product.productName}</p>
                    </div>
                ))} */}
 {searchCategory=== "all" && 
          filteredData .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((product) => (
            <div key={product._id} className="filter__product">
                      <img src={product.productImage} alt={product.productName} />
                                <div className="filter__product__details">
                                    <h2>{product.productBrand}</h2>
                                    <h3>{product.productName}</h3>
                                    <h4>${product.productPurchasePrice}</h4>
                                    <button><Link to={`/product/${product._id}`}>View Details</Link></button>
                                </div>
            </div>
          ))}
          {searchCategory !== "all" &&
             filteredCategory .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((product)=>(
                <div key={product._id}>
                        <img src={product.productImage} alt={product.productName} />
                                <div className="filter__product__details">
                                    <h2>{product.productBrand}</h2>
                                    <h3>{product.productName}</h3>
                                    <h4>${product.productPurchasePrice}</h4>
                                    <button><Link to={`/product/${product._id}`}>View Details</Link></button>
                                </div>
              </div>
             ))  

          }
          <div style={{ display: `${filteredData.length === 0 && filteredCategory.length === 0 ? "none" : "flex"}`, alignItems: "center" }}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            <ArrowBackIosIcon />
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
{filteredCategory.length === 0 && filteredData.length === 0 && (
  <div>
    No Product to Show According to your Search!
  </div>
)}

          {searchProduct.length === 0 && <CategoryLoader/>}
                {/* {filteredCategory.length === 0 && searchProduct && searchProduct.map((product)=>(
                     <div key={product._id}>
                     <p>{product.productName}</p>
                 </div>
                ))} */}
            </div>
        </SearchStyledComponent>
     );
}
 
export default SearchComponent;