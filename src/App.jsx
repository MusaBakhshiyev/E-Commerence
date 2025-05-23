import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Favorite from './pages/Favorite/Favorite'
import Compare from './pages/Compare/Compare'
import Contact from './pages/Contact/Contact'
import Search from './pages/Search/Search'
import Detail from './pages/Detail/Detail'

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/search' element={<Search />} />
            <Route path='/detail' element={<Detail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
