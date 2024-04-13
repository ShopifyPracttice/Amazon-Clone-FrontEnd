import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProductStyledComponent = styled.div`
width: 100%;
height: 100vh;
display: grid;
place-items: center;
form{
    padding: 20px;
    border: 1px solid #ddd;
    width: 30%;
    border-radius: 6px;
    height: auto;
    h1{
        margin-left: 120px;
        color: #2f6199;
    }
}
form>div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label{
        font-size: 20px;
        color: #2f6199;
    }
    select{
        width: 65%;
        padding: 8px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    input{
        width: 60%;
        padding: 8px;
        border: 1px solid #ddd;
        outline: none;
        font-size: 18px;
        color: #666;
    }
    margin-bottom: 20px;
    button{
        background: #2f6199;
        color: #fff;
        border: none;
        width: 40%;
        height: 40px;
        border-radius: 6px;
        font-size: 18px;
        cursor: pointer;
    }
}
`

const selectOptions = [
  { value: "arts", option: "Arts & Crafts" },
  { value: "automotive", option: "Automotive" },
  { value: "baby", option: "Baby" },
  { value: "beauty", option: "Beauty & Personal Care" },
  { value: "books", option: "Books" },
  { value: "boysFashion", option: "Boy's Fashion" },
  { value: "computer", option: "Computer" },
  { value: "digitalMusic", option: "Digital Music" },
  { value: "electronics", option: "Electronics" },
  { value: "girlsFashion", option: "Girl's Fashion" },
  { value: "health", option: "Health & Household" },
  { value: "homeKitchen", option: "Home & Kitchen" },
  { value: "industrial", option: "Industrial & Scientific" },
  { value: "kindleStore", option: "Kindle Store" },
  { value: "luggage", option: "Luggage" },
  { value: "mensFashion", option: "Men's Fashion" },
  { value: "moviesTv", option: "Movies & TV" },
  { value: "musicCd", option: "Music, CD & Vinyl" },
  { value: "petSupplies", option: "Pet Suplies" },
  { value: "sports", option: "Sports & OutDoors" },
]


const AddProductComponent = () => {
  const navigate = useNavigate()
  const [userID, setUserID] = useState("")
  const [size, setSize] = useState('');
  const [checkbox, setCheckBox] = useState(false)
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    productBrand: '',
    productImage: "",
    productPurchasePrice: 0,
    productRetailPrice: 0,
    productStock: 0,
    productCategory: 'arts',
  });
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get('https://amazon-clone-backend-wofw.onrender.com/user/validate-token', {
          withCredentials: true,
        });
        setUserID(response.data.userId)
      } catch (error) {
        // setIsAuthorized(false);
        console.log(error);
      }
      // window.location.reload();
    };

    fetchUserData();
  }, []);


  const convertFileToBase64 = (file, index) =>{ 
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newColors = [...colors];
        newColors[index] = {
          ...newColors[index],
          image: reader.result // Save base64 data to the image field of the corresponding color object
        };
        setColors(newColors);
      };
  };
  const convertToBase64 = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({
        ...formData,
        productImage: reader.result // Save base64 data to formData.image
      });
    };
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file)
    }
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (index, e) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], color: e.target.value };
    setColors(newColors);
  };

  const handleImageColorChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      convertFileToBase64(file, index);
    }
  };

  const addColor = () => {
    setColors([...colors, { color: '#000', size: size, image: null }]);
  };

  const removeColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    // Combine all form data including colors into formDataToSend
    const formDataToSend = {
      ...formData,
      userId: userID,
      size,
      colors
    };
    try {
      const response = await axios.post('https://amazon-clone-backend-wofw.onrender.com/user/add-product', formDataToSend);
      setFormData({
        productName: '',
        productBrand: '',
        productImage: "",
        productPurchasePrice: 0,
        productRetailPrice: 0,
        productStock: 0,
        productCategory: 'arts',
      })
      setSize("")
      setCheckBox(false)
      setColors([])
      if (response.status === 201) {
        alert(response.data.message)
        navigate("/")
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error);
    }
    console.log(formDataToSend);
  };
  const handleCancelClick = (e) => {
    e.preventDefault()
    setFormData({
      productName: '',
      productBrand: '',
      productImage: null,
      productPurchasePrice: 0,
      productRetailPrice: 0,
      productStock: 0,
      productCategory: 'arts',
    })
  }
  return (
    <AddProductStyledComponent>
      <form>
        <h1>Add Product</h1>
        <div>
          <label>Product Title</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Brand</label>
          <input
            type="text"
            name="productBrand"
            value={formData.productBrand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Image</label>
          <input
            style={{ border: "none" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>Purchase Price $</label>
          <input
            type="number"
            name="productPurchasePrice"
            value={formData.productPurchasePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Retail Price $</label>
          <input
            type="number"
            name="productRetailPrice"
            value={formData.productRetailPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="productStock"
            require="true"
            value={formData.productStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
          >
            {selectOptions.map((opt, idx) => (
              <option key={idx} value={opt.value}>{opt.option}</option>
            ))}
          </select>
        </div>
        <div style={{ width: "100%", padding: "0", display: "flex", height: "40px" }}>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckBox(!checkbox)}
          />
          <p style={{ width: "200%" }}>Is Your Product Contain Size and Colors?</p>
        </div>
        <div style={{ display: checkbox ? "block" : "none" }}>
          <div>
            <select value={size} onChange={handleSizeChange}>
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div style={{ display: "block" }}>
            {colors.map((color, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <p style={{ width: "20%" }}>{color.size}</p>
                <input
                  type="color"
                  style={{ width: "50px", marginRight: "10px", height: "30px", padding: "0" }}
                  value={color.color}
                  onChange={(e) => handleColorChange(index, e)}
                />
                <input
                  type="file"
                  accept="image/*"
                  require="true"
                  style={{ width: "120px", fontSize: "12px", marginRight: "10px" }}
                  onChange={(e) => handleImageColorChange(index, e)}
                />
                <button
                  style={{ width: "100px", fontSize: "12px" }}

                  type="button" onClick={() => removeColor(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button
            style={{ width: "150px", fontSize: "14px", marginTop: "10px" }}

            type="button" onClick={addColor}>Add New Color</button>
        </div>
        <div>
          <button onClick={handleSaveClick}>Save Product</button>
          <button onClick={handleCancelClick} style={{ background: "#fff", color: "#000", border: "1px solid #333" }}>Cancel</button>
        </div>
      </form>
    </AddProductStyledComponent>
  );
}

export default AddProductComponent;