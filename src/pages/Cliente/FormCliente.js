import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormCliente = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState(0);
    const [telefono, setTelefono] = useState(0);
    const [direccion, setDireccion] = useState('');

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosClientes(id);
    }, [id]);

    const fetchDatosClientes = (id) => {

        const url = 'http://127.0.0.1:8000/api/cliente/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosClientes', response.data.nombre);
                const objClientes = response.data;
                console.log('objClientes', objClientes.nombre);

                setNombre(objClientes.nombre);
                setApellido(objClientes.apellido);
                setDni(objClientes.dni);
                setTelefono(objClientes.telefono);
                setDireccion(objClientes.direccion);

            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "nombre": nombre,
            "apellido": apellido,
            "dni": dni,
            "telefono": telefono,
            "direccion": direccion
        };
        if (id === 0) {
            insertarCliente(params);
        } else {
            actualizarCliente(params);
        }
    }
    const insertarCliente = (params) => {

        const url = 'http://127.0.0.1:8000/api/cliente';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/cliente');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarCliente = (params) => {

        const url = 'http://127.0.0.1:8000/api/cliente/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/cliente');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Formulario de Cliente</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>

                        <div><label>Apellido:</label></div>
                        <div><input className="form-control" type="text" value={apellido} onChange={(e) => {
                            setApellido(e.target.value);
                        }} /></div>

                        <div><label>DNI:</label></div>
                        <div><input className="form-control" type="text" value={dni} onChange={(e) => {
                            setDni(e.target.value);
                        }} /></div>

                        <div><label>Telefono:</label></div>
                        <div><input className="form-control" type="text" value={telefono} onChange={(e) => {
                            setTelefono(e.target.value);
                        }} /></div>

                        <div><label>Direccion:</label></div>
                        <div><input className="form-control" type="text" value={direccion} onChange={(e) => {
                            setDireccion(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormCliente;