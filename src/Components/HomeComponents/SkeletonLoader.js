import styled from "styled-components";

const SkeletonLoaderComponent = styled.div`
width: 100%;
height: 78vh;
padding-bottom: 18px;
background: #eee;
position: relative;
.skeleton__loader{
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  position: absolute;
  bottom: 2%;
  left: 0%;
}
.skeleton__loader__component{
    height: 250px;
    width: 20%;
    padding: 10px;
    background: #fff;
    p{
        width: 70%;
        height: 30px;
        background: #eee;
        border-radius: 20px; 
    }
    .skeleton__loader__div{
        width: 100%;
        height: 75%;
        background: #eee;
    }
}
`

const SkeletonLoader = () => {
    return ( 
        <SkeletonLoaderComponent>
          <div className="skeleton__loader">
             <div className="skeleton__loader__component">
                <p></p>
                <div className="skeleton__loader__div">

                </div>
             </div>
             <div className="skeleton__loader__component">
             <p></p>
                <div className="skeleton__loader__div">

                </div>
             </div>
             <div className="skeleton__loader__component">
             <p></p>
                <div className="skeleton__loader__div">

                </div>
             </div>
             <div className="skeleton__loader__component">
             <p></p>
                <div className="skeleton__loader__div">

                </div>
             </div>
          </div>
        </SkeletonLoaderComponent>
     );
}
 
export default SkeletonLoader;