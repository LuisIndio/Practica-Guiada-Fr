import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormReceta = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosRecetas(id);
    }, [id]);

    const fetchDatosRecetas = (id) => {

        const url = 'http://127.0.0.1:8000/api/receta/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosRecetas', response.data.nombre);
                const objRecetas = response.data;
                console.log('objRecetas', objRecetas.nombre);

                setNombre(objRecetas.nombre);
                setDescripcion(objRecetas.descripcion);
                

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
            insertarReceta(params);
        } else {
            actualizarReceta(params);
        }
    }
    const insertarReceta = (params) => {

        const url = 'http://127.0.0.1:8000/api/receta';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/receta');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarReceta = (params) => {

        const url = 'http://127.0.0.1:8000/api/receta/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/receta');
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
                        <Card.Title>Formulario de Receta</Card.Title>

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

export default FormReceta;