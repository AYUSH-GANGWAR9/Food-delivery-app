import { useState, useEffect } from 'react'
import Navbar from './Components/NavBar/NavBar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Profile from './pages/Profile/Profile'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Debug log for search query
  useEffect(() => {
    console.log("App component - searchQuery:", searchQuery);
  }, [searchQuery]);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} onSearch={setSearchQuery} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    <Footer/>
    </>
  )
}

export default App
