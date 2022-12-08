import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormReceta = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [cantidad, setCantidad] = useState('');
    
    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosStockIngredientes(id);
    }, [id]);

    const fetchDatosStockIngredientes = (id) => {

        const url = 'http://127.0.0.1:8000/api/stockingrediente/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosStockIngredientes', response.data.cantidad);
                const objStockIngredientes = response.data;
                console.log('objStockIngredientes', objStockIngredientes.cantidad);

                setCantidad(objStockIngredientes.cantidad);
                
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "cantidad": cantidad
            
        };
        if (id === 0) {
            insertarStockIngredientes(params);
        } else {
            actualizarStockIngredientes(params);
        }
    }
    const insertarStockIngredientes = (params) => {

        const url = 'http://127.0.0.1:8000/api/stockingrediente';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/stockingrediente');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarStockIngredientes = (params) => {

        const url = 'http://127.0.0.1:8000/api/stockingrediente/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/stockingrediente');
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
                        <Card.Title>Formulario de Stock Ingredientes</Card.Title>

                        <div><label>Cantidad:</label></div>
                        <div><input className="form-control" type="text" value={cantidad} onChange={(e) => {
                            setCantidad(e.target.value);
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