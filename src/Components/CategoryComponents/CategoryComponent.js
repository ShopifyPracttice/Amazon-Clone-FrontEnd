import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryFilter from "./CategoryFilter";
import CategoryLoader from "./CategoryLoader";
import { Link } from "react-router-dom";

const CategoryStyledComponent = styled.div`
width: 100%;
.product__category__section{
    display: flex;
    width: 100%;
    margin-top: 80px;
    .product__category__filter__section{
        width: 20%;
    }
    .product__category__filter__products{
        width: 80%;
    }
}
h1{
    font-size: 30px;
    margin-left: 20px;
}
.all__product__category{
    width: 100%;
    height: 180px;
    cursor: pointer;
    display: flex;
    background: #eee;
    align-items: center;
    .product__category__icons{
        width: 5%;
        display: grid;
        place-items: center;
        cursor: pointer;
        p{
            padding: 12px;
            background: #fff;
            border-radius: 12px;
        }
    }
}
.product__category{
    width: 90%;
    background: #eee;
    overflow: hidden;
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    img{
        width: 100px;
        height: 100px;
        object-fit: contain;
        background: #fff;
        border-radius: 50%;
    }
    h2{
        font-size: 14px;
        text-align: center;
}
}
.product__category__div{
    display: grid;
    place-items: center;
}
.filter__product{
    display: flex;
    width: 99%;
    gap: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    img{
        width: 250px;
        height: 250px;
        // object-fit: contain;
        // background: #eee;
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


const CategoryComponent = () => {
    const PAGE_SIZE = 5;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkbox, setCheckBox] = useState({
        "arts": false,
        "automotive": false,
        "baby": false,
        "beauty": false,
        "books": false,
        "boysFashion": false,
        "computer": false,
        "digitalMusic": false,
        "electronics": false,
        "girlsFashion": false,
        "health": false,
        "homeKitchen": false,
        "industrial": false,
        "kindleStore": false,
        "luggage": false,
        "mensFashion": false,
        "moviesTv": false,
        "musicCd": false,
        "petSupplies": false,
        "sports": false
    })
    const [filterCategories, setFilterCategories] = useState("")
    const [productToShow, setProductsToShow] = useState(1)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(
                "https://amazon-clone-backend-wofw.onrender.com/product/all-products"
            );
            setProducts(response.data);
            console.log(response);
        };
        fetchProduct();
    }, []);
    const generateFilterString = () => {
        let filterString = "";
        Object.keys(checkbox).forEach(category => {
            if (checkbox[category]) {
                filterString += category + ",";
            }
        });
        filterString = filterString.replace(/,\s*$/, "");
        return filterString;
    };
    useEffect(() => {
        const newFilterString = generateFilterString();
        setFilterCategories(newFilterString);
    }, [checkbox]);
    const productMatchesFilter = (productCategories) => {
        if (!filterCategories) return true;
        const categoriesArray = productCategories.split(',').map(category => category.trim());
        return categoriesArray.some(category => filterCategories.includes(category));
    };
    const filteredProducts = products
        .filter(product => productMatchesFilter(product.productCategory));

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handleAllProductClick = ()=>{
        setCheckBox(
            {
                "arts": false,
                "automotive": false,
                "baby": false,
                "beauty": false,
                "books": false,
                "boysFashion": false,
                "computer": false,
                "digitalMusic": false,
                "electronics": false,
                "girlsFashion": false,
                "health": false,
                "homeKitchen": false,
                "industrial": false,
                "kindleStore": false,
                "luggage": false,
                "mensFashion": false,
                "moviesTv": false,
                "musicCd": false,
                "petSupplies": false,
                "sports": false
            }
        )
    }

    return (
        <CategoryStyledComponent>
            <h1>All Categories</h1>
            <div className="all__product__category">
                <div className="product__category__icons"><p onClick={() => setProductsToShow(prevProductsToShow => prevProductsToShow > 1 ? prevProductsToShow - 1 : 1)}><ArrowBackIosIcon /></p></div>
                <div className="product__category">
                    <div style={{ display: `${productToShow === 1 ? "flex" : "none"}`, width: `${productToShow === 1 ? "100%" : "0%"}`, gap: "10px" }}>
                        <div className="product__category__div" onClick={handleAllProductClick}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Alldeals_white._CB468586681_.png" alt="all-products" />
                            <h2>All Products</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, arts: !prevState.arts }))}>
                            <img src="https://m.media-amazon.com/images/G/01/01/goldbox/B07XKF5RM3.01.RMXXXXXX2.png" alt="arts-products" />
                            <h2>Arts & Crafts</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, automotive: !prevState.automotive }))}>
                            <img src="https://m.media-amazon.com/images/G/01/Automotive/TruckCrop2.png" alt="automotive" />
                            <h2>Automotive</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, baby: !prevState.baby }))}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Parents_white._CB468586676_.png" alt="Baby" />
                            <h2>Baby</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, beauty: !prevState.beauty }))}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Beauty_white._CB468586681_.png" alt="Beauty" />
                            <h2>Beauty & Products</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, books: !prevState.books }))}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Books_white._CB468586681_.png" alt="Books" />
                            <h2>Books</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, boysFashion: !prevState.boysFashion }))}>
                            <img src="https://m.media-amazon.com/images/I/81S9AlFMHaL._AC_UF226,226_FMjpg_.jpg" alt="Boy's Fashion" />
                            <h2>Boy's Fashion</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, computer: !prevState.computer }))}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Computers_white._CB468586682_.png" alt="Computer" />
                            <h2>Computer</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, digitalMusic: !prevState.digitalMusic }))}>
                            <img src="https://m.media-amazon.com/images/I/31M3Yaf48ZL.jpg" alt="Digital-Music" />
                            <h2>Digital Music</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, electronics: !prevState.electronics }))}>
                            <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Electronics_white._CB468586680_.png" alt="Electronics" />
                            <h2>Electronics</h2>
                        </div>
                        <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, girlsFashion: !prevState.girlsFashion }))}>
                            <img src="https://m.media-amazon.com/images/I/41BtQAoSquL._AC_UF226,226_FMjpg_.jpg" alt="Girls-Fashion" />
                            <h2>Girl's Fashion</h2>
                        </div>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, health: !prevState.health }))}>
                        <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/HPC_white._CB468586682_.png" alt="Health" />
                        <h2>Health & Household</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, industrial: !prevState.industrial }))}>
                        <img src="https://m.media-amazon.com/images/G/01/img17/events/blackfriday/bfcm_landing_page_faceout_lawn.jpg" alt="Industrial" />
                        <h2>Industrial & Scientific</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, kindleStore: !prevState.kindleStore }))}>
                        <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Office_white._CB468586679_.png" alt="Kindle-Store" />
                        <h2>Kindle Store</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, luggage: !prevState.luggage }))}>
                        <img src="https://m.media-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_Bubble_boxes_color_v2.jpg" alt="Luggage" />
                        <h2>Luggage</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, mensFashion: !prevState.mensFashion }))}>
                        <img src="https://m.media-amazon.com/images/I/41Mj9O0rqML._AC_UF226,226_FMjpg_.jpg" alt="Men's-Fashion" />
                        <h2>Men's Fashion</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, moviesTv: !prevState.moviesTv }))}>
                        <img src="https://m.media-amazon.com/images/G/01/US-hq/2022/img/Consumer_Electronics/XCM_CUTTLE_1405415_2158742_US_CUTTLE_200x200_en_US.jpg" alt="Movies-TV" />
                        <h2>Movies & TV</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, musicCd: !prevState.musicCd }))}>
                        <img src="https://m.media-amazon.com/images/I/31M3Yaf48ZL.jpg" alt="Music" />
                        <h2>Music, CD</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, petSupplies: !prevState.petSupplies }))}>
                        <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Pets_white._CB468586679_.png" alt="Pets-Supplies" />
                        <h2>Pet's Suplies</h2>
                    </div>
                    <div className="product__category__div" onClick={() => setCheckBox(prevState => ({ ...prevState, sports: !prevState.sports }))}>
                        <img src="https://m.media-amazon.com/images/G/01/goldbox/images/faceout/Sports_white._CB468586678_.png" alt="Sports" />
                        <h2>Sports & OutDoors</h2>
                    </div>
                </div>
                <div className="product__category__icons" ><p onClick={() => setProductsToShow(prevProductsToShow => prevProductsToShow > 2 ? prevProductsToShow + 1 : 2)}><ArrowForwardIosIcon /></p></div>
            </div>
            <div className="product__category__section">
                <div className="product__category__filter__section">
                    <CategoryFilter checkbox={checkbox} setCheckBox={setCheckBox} />
                </div>
                <div className="product__category__filter__products">
                    {filteredProducts
                        .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                        .map(product => (
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
                    {filteredProducts.length === 0 && products.length > 0 && (
                        <div className="filter__product">No Product of this Category Exist</div>
                    )}
                    {products.length === 0 && (
                        <CategoryLoader/>
                    )}

                    <div style={{ display: `${filteredProducts.length === 0 ? "none" : "flex"}`, alignItems: "center" }}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            <ArrowBackIosIcon />
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                </div>

            </div>
        </CategoryStyledComponent>
    );
}

export default CategoryComponent;