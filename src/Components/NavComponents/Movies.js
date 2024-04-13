import styled from "styled-components";
import MoviesData from "./NavJsonComponents/Movies.json"

const MoviesComponent = styled.div`
h3{
    padding-left: 20px;
}
.movies__div{
    p{
        padding-left: 20px;
        padding-top:6px;
        padding-bottom: 6px;
        cursor: pointer;
    }
p:hover{
    background: #eee;
}
}
`

const Movies = () => {
    return ( 
        <MoviesComponent>
        <h3>Movies & Telivision</h3>
         <div className="movies__div">
            {MoviesData.map((data, index) =>(
                <div key={index}>
                   <p>{data.titleName}</p> 
                </div>
            ))}
         </div>
        </MoviesComponent>
     );
}
 
export default Movies;