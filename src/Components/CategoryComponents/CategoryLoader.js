import styled from "styled-components";

const CategoryLoaderComponent = styled.div`
.skeleton__loader__component{
    height: 300px;
    width: 100%;
    display: flex;
    gap: 20px;
    margin-bottom: 50px;
    background: #fff;
    p{
        width: 100px;
        height: 30px;
        background: #eee;
        border-radius: 20px; 
    }
    button{
        width: 100px;
        height: 30px;
        color: transparent;
        background: #eee;
        border: none;
        // border-radius: 20px;      
    }
    .skeleton__loader__img{
        width: 300px;
        height: 300px;
        background: #eee;
    }
}
`

const CategoryLoader = () => {
    return ( 
        <CategoryLoaderComponent>
            <div className="skeleton__loader__component">
             <div className="skeleton__loader__img"></div>
              <div className="skeleton__loader__details">
                <p></p>
                <p></p>
                <p></p>
                <button></button>
              </div>
            </div>
                <div className="skeleton__loader__component">
            <div className="skeleton__loader__img"></div>
              <div className="skeleton__loader__details">
                <p></p>
                <p></p>
                <p></p>
                <button></button>
              </div>
            </div>
        </CategoryLoaderComponent>
     );
}
 
export default CategoryLoader;