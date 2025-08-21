
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/landing';
import Login from './pages/Authentication/logIn';
import Register from './pages/Authentication/register';
import Home from './pages/Home/homePage';
import { Toaster } from "react-hot-toast";


function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster />
    </Router>
    </>
  )
}

export default App
