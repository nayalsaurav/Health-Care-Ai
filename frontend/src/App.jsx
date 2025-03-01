import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Chatbot } from "./components/Chatbot";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Scrap from "./components/Scrap";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { useContext } from "react";
import { ChatContext } from "./store/ChatContext";
import Map from "./components/Map";
import HealthMetric from "./components/HealthMetric";


function App() {
  const {isLoggedin} = useContext(ChatContext);
  return (
    <Routes>
      {/* Dashboard route with nested child routes */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Homepage />
            <Footer />
          </>
        }
      />
      <Route path='/dashboard' element={isLoggedin?<Dashboard />:<Signin/>}>
        <Route path="search" element={<Scrap />} />
        {/* Define child routes inside Dashboard */}
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="chatbot/:id" element={<Chatbot />} />
        <Route path="tracker" element={<HealthMetric />} />
        <Route path="findHosp" element={<Map />} />
        {/* <Route path="/schedule" element={<Schedule />} /> */}
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;

