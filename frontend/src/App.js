
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductsScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrder from './screens/PlaceOrder';



function App() {
  const {state, dispatch: ctxDispatch } = useContext(Store);
  const {cart, userInfo} = state;

  const signoutHandler = () =>{
    ctxDispatch({ type: 'USER_SIGNOUT' }); 
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  
    return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="primary" variant="dark">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>YourShoes</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto w-100 justify-content-end">
            <Link to="/cart" className="nav-link">
              Carrito 
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}

            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Perfil Usuario</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Historial</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                  <Link 
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                  >
                  Cerrar sesion
                  </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
              Registrate 
              </Link>
            )}
            </Nav>
          </Container>
        </Navbar>
      
      </header>
      <main>
      <Container className='mt-3'>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/Signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Container>
       
      </main>
      <footer>
        <div className='text-center'>Derechos Reservados a Facundo Bustos</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
