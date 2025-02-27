import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
// import Signin from "./pages/Signin";
import { Chatbot } from "./components/Chatbot";

function App() {
  return (
    <>
       {/* <Navbar></Navbar> */}
      <Routes>
       
        <Route path="/" element={<> <Navbar/> <Homepage /><Footer/></>} />
        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/chatbot" element={<Chatbot></Chatbot>} />
        <Route path="/chatbot/:id" element={<Chatbot></Chatbot>} />
      </Routes>
    
    </>
  );
}

export default App;
