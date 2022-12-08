import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormCategorias = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosCategorias(id);
    }, [id]);

    const fetchDatosCategorias = (id) => {

        const url = 'http://127.0.0.1:8000/api/categoria/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosCategorias', response.data.nombre);
                const objCategorias = response.data;
                console.log('objCategorias', objCategorias.nombre);

                setNombre(objCategorias.nombre);
                setDescripcion(objCategorias.descripcion);
                

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
            "descripcion": descripcion,
            
        };
        if (id === 0) {
            insertarCategoria(params);
        } else {
            actualizarCategoria(params);
        }
    }
    const insertarCategoria = (params) => {

        const url = 'http://127.0.0.1:8000/api/categoria';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/categoria');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarCategoria = (params) => {

        const url = 'http://127.0.0.1:8000/api/categoria/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/categoria');
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
                        <Card.Title>Formulario de Categoria</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>

                        <div><label>Descripcion:</label></div>
                        <div><input className="form-control" type="text" value={descripcion} onChange={(e) => {
                            setDescripcion(e.target.value);
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

export default FormCategorias;