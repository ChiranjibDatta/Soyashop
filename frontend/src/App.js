import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
