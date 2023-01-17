import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch} = useContext(Store)
    const {
        userInfo,
    } = state;
    
    const [fullName, setFullName] = useState ('');
    const [address, setAddress] = useState ('');
    const [city, setCity] = useState ('');
    const [postal, setPostal] = useState ('');
    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);
    const [pais, setPais] = useState ('');
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postal,
                pais,
            }
        })
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postal,
                pais,
            })
        );
        navigate('/payment')
    };
  return <div>
        <Helmet>
            <title>Direccion de envio</title>
        </Helmet>
        <div className="container small-container">
        <h1 className="my-3">Direccion de envio</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addres">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postal">
            <Form.Label>Codigo postal</Form.Label>
            <Form.Control
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Pais">
            <Form.Label>Pais</Form.Label>
            <Form.Control
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required />
        </Form.Group>
        <div className="mb-3">
            <Button variant="primary" type="submit">
                Continuar
            </Button>
        </div>
        </Form>


        </div>
      
    </div>;
  
}
