import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Routes,Route, NavLink } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Favorite from './pages/Favorite/Favorite'
import Compare from './pages/Compare/Compare'
import Contact from './pages/Contact/Contact'

function App() {

  return (
    <BrowserRouter className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>  }/>
        <Route path='/contact' element={<Contact/>  }/>
        <Route path='/cart' element={<Cart/>  }/>
        <Route path='/favorite' element={<Favorite/>  }/>
        <Route path='/compare' element={<Compare/>  }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
