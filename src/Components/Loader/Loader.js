import styled from "styled-components";

const LoaderComponent = styled.div`
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.loader {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 14px;
    height: 14px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

`
const Loader = () => {
    return (
        <LoaderComponent> 
        <div className="loader-container">
        <div className="loader"></div>
    </div>
    </LoaderComponent>
     );
}
 
export default Loader;