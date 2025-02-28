import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Chatbot } from "./components/Chatbot";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <Routes>
      {/* Dashboard route with nested child routes */}
      <Route path="/" element={<><Navbar/><Homepage /><Footer/></>} />
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Define child routes inside Dashboard */}
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="chatbot/:id" element={<Chatbot />} />
      </Route>
    </Routes>
  );
}

export default App;