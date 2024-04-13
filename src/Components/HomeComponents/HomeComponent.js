import styled from "styled-components";
import SkeletonLoader from "./SkeletonLoader";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ToastContainer} from 'react-toastify';

const HomeStyledComponent = styled.div`
background: #e1e1e1;
  .carousel-container {
    width: 100%;
    height: 81vh;
    z-index: 0;
  }

  .carousel-slide {
    width: 100%;
    height: 81vh;
    z-index: 1;
    img {
      width: 100%;
      height: 81vh;
      z-index: 1;
      object-fit: cover;
    }
  }

  .btn-container {
    position: absolute;
    width: 98%;
    height: 40vh;
    padding:10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }

  .btn {
    color: white;
    background: transparent;
    border: none;
    width: 100px;
    height: 150px;
    cursor: pointer;
    &:hover{
      background-color: rgba(0, 0, 0, 0.5);

    }
  }
  .home__products{
    width: 100%;
    height: 167vh;
    overflow: hidden;
    margin-top: -22%;
    z-index: 20;
    display: grid;
    place-items: center;
    .product{
      display: grid;
      gap: 20px;
      grid-template-columns:auto auto auto;
      width: 90%;
      justify-content: space-between;
    }.classic__products{
      width: 250px;
      height: 300px;
      padding: 20px;
      background: #fff;
      text-transform: capitalize;
      img{
        width: 100%;
        height: 70%;
      }
    }
  }
`;

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const images = [
    "https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
  ]
  return (
    <HomeStyledComponent>
        <ToastContainer/>
      {products.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <>
        <div className="carousel-container">
          <div className="btn-container">
            <button className="btn" onClick={goToPrevSlide}>
              <ArrowBackIosIcon fontSize="large"/>
            </button>
            <button className="btn"  onClick={goToNextSlide}>
              <ArrowForwardIosIcon fontSize="large"/>
            </button>
          </div>
          <div className="carousel-slide">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                style={{
                  display: index === currentIndex ? "block" : "none",
                }}
              />
            ))}
          </div>
        </div>
        <div className="home__products">
          <div className="product">
            {products.map((item)=>(
                 <div key={item._id} className="classic__products">
                    <h3>Deals in {item.productCategory}</h3>
                    <img src={item.productImage} alt={item.productName}/>
                 </div>
            ))}
          </div>
        </div>
        </>
      )}
    </HomeStyledComponent>
  );
};

export default HomeComponent;
