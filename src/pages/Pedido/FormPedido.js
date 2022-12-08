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
    const [direccion, setDireccion] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [cliente, setCliente] = useState([]);

    useEffect(() => {
        
        fetchDatosClientes();
        fetchDatosPedidos(id)
    }, [id]);

    const fetchDatosClientes = () => {

        const url = 'http://127.0.0.1:8000/api/cliente';
        axios.get(url
        )
            .then((response) => {
                console.log('fetchDatosClientes', response.data);
                const objClientes = response.data;
                console.log('objClientes', objClientes);
                setCliente(objClientes);
                

            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }
    const fetchDatosPedidos = (id) => {

        const url = 'http://127.0.0.1:8000/api/pedido/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosPedidos', response.data.nombre);
                const objPedidos = response.data;
                console.log('objPedidos', objPedidos);

                setNombre(objPedidos.nombre);
                setDireccion(objPedidos.direccion);
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
            "direccion": direccion,
            "cliente_id":clienteid
        };
        if (id === 0) {
            insertarPedido(params);
        } else {
            actualizarPedido(params);
        }
    }
    const insertarPedido = (params) => {

        const url = 'http://127.0.0.1:8000/api/pedido';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {

            console.log('recibido', response.data);
            history.push('/pedido');
        }).catch(error => {
            console.log(error);
            console.log(clienteid);
            console.log(direccion);


            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarPedido = (params) => {

        const url = 'http://127.0.0.1:8000/api/pedido/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/pedido');
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
                        <Card.Title>Formulario de pedido</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>

                        <div><label>Direccion:</label></div> 
                        <div><input className="form-control" type="text" value={direccion} onChange={(e) => {
                            setDireccion(e.target.value);
                        }} /></div>

                        <div><label>Cliente:</label></div>
                        <select name="clientes" className='form-control' onChange={(e) => {
                            setClienteid(e.target.value);
                        }}>
                                {cliente.map(elemento=>(
                                    <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                )
                                )}
                        </select>

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