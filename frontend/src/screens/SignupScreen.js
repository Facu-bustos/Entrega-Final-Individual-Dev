import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';




export default function SignupScreen() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { state, dispatch: ctxDispatch } = useContext(Store); 
    const {userInfo} = state;

    const submitHandler = async (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
        toast.error('Las contraseñas no coinciden')
        return;
      }
      try {
        const {data} = await Axios.post('/api/users/signup', {
          name,
          email,
          password,
        });
        ctxDispatch({type: 'USER_SIGNIN', payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/'); 
      } catch (err) {
        toast.error('Email o contraseña invalidas');
      }
    };
    useEffect(() => {
      if (userInfo){
        navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


  return (
    <Container className="small-container">
      <Helmet>
        <title>Registrate</title>
      </Helmet>
      <h1 className="my-3">Registrate</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password"  required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <div className="mb-3">
            <Button type="submit">Registrate</Button>
        </div>
        <div className="mb-3">
            ¿Ya estas registrado? {' '}
            <Link to={`/signin?redirect=${redirect}`}>Crear cuenta</Link>

        </div>
      </Form>
    </Container>
  );
}
