import styled from "styled-components";

const CategoryFilterComponents = styled.div`
padding: 10px;
// margin-top: 70px;
// width: 15%;
// border: 1px solid #ddd;
h5{
    font-size: 20px;
}
.checkbox__container{
    display: flex;
    gap: 10px;
}
`

const CategoryFilter = ({checkbox, setCheckBox}) => {
    const handleChange = (category) => {
        setCheckBox(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };
    return (
       <CategoryFilterComponents>
        <h5>Departments</h5>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.arts} onChange={()=> handleChange("arts")}/>
            <label>Arts & Crafts</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.automotive} onChange={()=>handleChange("automotive")}/>
            <label>Automotive</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.baby} onChange={()=>handleChange("baby")}/>
            <label>Baby</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.beauty} onChange={()=>handleChange("beauty")}/>
            <label>Beauty & Products</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.books} onChange={()=>handleChange("books")}/>
            <label>Books</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.boysFashion} onChange={()=>handleChange("boysFashion")}/>
            <label>Boy's Fashion</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.computer} onChange={()=>handleChange("computer")}/>
            <label>Computer</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.digitalMusic} onChange={()=>handleChange("digitalMusic")}/>
            <label>Digital Music</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.electronics} onChange={()=>handleChange("electronics")}/>
            <label>Electronics</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.girlsFashion} onChange={()=>handleChange("girlsFashion")}/>
            <label>Girl's Fashion</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.health} onChange={()=>handleChange("health")}/>
            <label>Health & Household</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.industrial} onChange={()=>handleChange("industrial")}/>
            <label>Industrial & Scientific</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.kindleStore} onChange={()=>handleChange("kindleStore")}/>
            <label>Kindel Store</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.luggage} onChange={()=>handleChange("luggage")}/>
            <label>Luggage</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.mensFashion} onChange={()=>handleChange("mensFashion")}/>
            <label>Men's Fashion</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.moviesTv} onChange={()=>handleChange("moviesTv")}/>
            <label>Movies & TV</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.musicCd} onChange={()=>handleChange("musicCd")}/>
            <label>Music, CD</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.petSupplies} onChange={()=>handleChange("petSupplies")}/>
            <label>Pet's Suplies</label>
        </div>
        <div className="checkbox__container">
            <input type="checkbox" checked={checkbox.sports} onChange={()=>handleChange("sports")}/>
            <label>Sports & OutDoors</label>
        </div>
        
       </CategoryFilterComponents> 
    );
}
 
export default CategoryFilter;