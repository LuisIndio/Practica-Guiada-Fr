import React, { useState } from 'react'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {  sesionIniciada } from '../redux/loginSlice';

const Login = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const enviarLogin = () => {
        const url = 'http://127.0.0.1:8000/api/login';
        const params = {
            email,
            password
        }
        axios.post(url, params)
            .then(response => {
                console.log('recibido', response.data.access_token);
                const token = response.data.access_token;
                
                dispatch(sesionIniciada(token))
                localStorage.setItem('token', token);

                //if (decoded.is_superuser == true || decoded.type_user == 4 || decoded.type_user == 2) {
                //    localStorage.setItem('usuario', decoded.type_user);
                    history.push('/cliente');
                //} else {
                //    history.push('/login');
                //}
            }).catch(error => {
                console.log(error);
            });
    }
    
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Iniciar Sesión</Card.Title>

                        <div><label>Email:</label></div>
                        <div><input className="form-control" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>
                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarLogin}>
                            Iniciar Sesión
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;