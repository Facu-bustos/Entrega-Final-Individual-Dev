import React, { useContext, useEffect } from 'react'
import {Helmet} from 'react-helmet-async';
import {Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';


export default function PlaceOrder() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;  

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //Redondeamos el numero con MathRound
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c)=> a + c.quantity * c.price, 0)
        );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice; 
    
    const placeOrderHandler = async () => {};

    useEffect(()=>{
        if (!cart.paymentMethod){
            navigate ('/payment');
        }
    }, [cart, navigate]);
  return  <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>ORDEN REALIZADA</title>
        </Helmet>
        <h1 className="my-3">Orden Realizada</h1>
        <Row>
            <Col md={8}>
                <Card className="mb3">
                    <Card.Body>
                        <Card.Title>Dirección de envio</Card.Title>
                        <Card.Text>
                        <strong>Nombre:</strong>{cart.shippingAddress.fullName} <br />
                        <strong>Dirección de envio:</strong>{cart.shippingAddress.address},
                        {cart.shippingAddress.city}, {cart.shippingAddress.postal}
                        {cart.shippingAddress.pais}
                        </Card.Text>
                        <Link to="/shipping">Editar información</Link>
                    </Card.Body>
                </Card>
                <hr></hr>
                <Card className="mb-3">
                <Card.Body>
                <Card.Title>Pago</Card.Title>
                <Card.Text>
                    <strong>Metodo de Pago</strong> {cart.paymentMethod} 
                </Card.Text>
                <Link to="/payment">Editar metodo de pago</Link>
                </Card.Body>
                </Card>
                <hr></hr>
                <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                        {cart.cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={6}>
                                <img src={item.image} alt={item.name}
                                className="img-fluid rounded img-thumbnail">
                                </img> {''}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}><span>{item.quantity}</span></Col>
                                <Col md={3}>${item.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Link to="/cart">Editar Compra</Link>
                </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Resumen de Compra</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice.toFixed(2)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Envio</Col>
                                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Compra Total</strong></Col>
                                    <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button type="button" onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}>Realizar Compra</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div> 
};
