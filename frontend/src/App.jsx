import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
// import Signin from "./pages/Signin";

function App() {
  return (
    <>
      
      <Routes>
        
        <Route path="/" element={<> <Navbar/> <Homepage /><Footer/></>} />
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    
    </>
  );
}

export default App;
