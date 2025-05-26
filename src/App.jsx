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
import Category from './pages/Category/Category'
import News from './pages/News/News'
import Stores from './pages/Stores/Stores'
import About from './pages/About/About'
import Order from './pages/Order/Order'

function App() {

  return (
    <BrowserRouter basename='/GadGetAll/'>
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
            <Route path='/category' element={<Category />} />
            <Route path='/news' element={<News />} />
            <Route path='/news' element={<News />} />
            <Route path='/stores' element={<Stores />} />
            <Route path='/about' element={<About />} />
            <Route path='/order' element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
