import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormProducto = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombres, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [idcategoria, setCategoria] = useState(0);

    
    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosProductos(id);
    }, [id]);
    
    const fetchDatosProductos = (id) => {

        const url = 'http://localhost:3000/api/productos/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            )
            .then((response) => {
                console.log('fetchDatosProductos', response.data.nombre);
                const objProductos = response.data;
                console.log('objProductos', objProductos.nombre);

                setNombre(objProductos.nombres);
                setPrecio(objProductos.precio);
                setCategoria(objProductos.idcategoria);

                
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "nombres": nombres,
            "precio": precio,
            "idcategoria": idcategoria,

        };
        if (id === 0) {
            insertarProducto(params);
        } else {
            actualizarProducto(params);
        }
    }
    const insertarProducto = (params) => {

        const url = 'http://localhost:3000/api/productos/productos/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            ).then(response => {
            console.log('recibido', response.data);
            history.push('/genero');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarProducto = (params) => {
        
        const url = 'http://localhost:3000/api/productos/' + id + '/';
        axios.put(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            ).then(response => {
            console.log('recibido', response.data);
            history.push('/genero');
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
                        <Card.Title>Formulario de Productos</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombres} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>
                        <div><label>Precio:</label></div>
                        <div><input className="form-control" type="text" value={precio} onChange={(e) => {
                            setPrecio(e.target.value);
                        }} /></div><div><label>Categoria:</label></div>
                        <div><input className="form-control" type="text" value={idcategoria} onChange={(e) => {
                            setCategoria(e.target.value);
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

export default FormProducto;