import styled from "styled-components";

const ProductSkeletonComponent = styled.div`
width: 100%;
padding-top: 50px;
display: flex;
justify-content: space-evenly;
.image__skeleton{
    width: 22%;
    height: 70vh;
    background: #eee;
}
.detail__skeleton{
    width: 30%;
    display: grid;
span{
    width: 100px;
    border-radius: 20px;
    height: 50px;
    background: #eee;
}
p{
    width: 90px;
    height: 40px;
    border-radius: 20px;
    background: #eee;
}

}
.add__to__cart__skeleton{
    width: 20%;
    padding: 20px;
    p{
        width: 120px;
    border-radius: 20px;
        height: 50px;
        background: #eee;
    }
    span{
        width: 15px;
        height: 50px;
        border-radius: 20px;
        background: #eee;
    }
    button{
        width: 100%;
        border: none;
        margin-bottom: 10px;
        height: 50px;
    border-radius: 20px;
        background: #eee;
    }
}
`

const ProductSkeleton = () => {
    return ( 
          <ProductSkeletonComponent>
            <div className="image__skeleton">

            </div>
            <div className="detail__skeleton">
            <span></span>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            </div>
            <div className="add__to__cart__skeleton">
              <p></p>
              <span></span>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </ProductSkeletonComponent>
     );
}
 
export default ProductSkeleton;