import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormProducto = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    const [categoria_id, setCategoria_id] = useState('');
    const [categoria, setCategoria] = useState([]);

    const [receta, setReceta] = useState([]);
    const [receta_id, setReceta_id] = useState('');


    useEffect(() => {
        
        fetchDatosProductos(id);
        fetchDatosReceta();
        fetchDatosCategoria();
        
        
    }, [id]);

    const fetchDatosProductos = (id) => {

        const url = 'http://127.0.0.1:8000/api/producto/' + id + '/';
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

                setNombre(objProductos.nombre);
                setPrecio(objProductos.precio);
                setCategoria_id(objProductos.categoria_id);
                setReceta_id(objProductos.receta_id);

            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }
    const fetchDatosCategoria = () => {

        const url = 'http://127.0.0.1:8000/api/categoria';
        axios.get(url
        )
            .then((response) => {
                console.log('fetchDatosCategoria', response.data);
                const objCategorias = response.data;
                console.log('objCategorias', objCategorias);
                setCategoria(objCategorias);


            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }
    const fetchDatosReceta = () => {

        const url = 'http://127.0.0.1:8000/api/receta';
        axios.get(url
        )
            .then((response) => {
                console.log('fetchDatosReceta', response.data);
                const objReceta = response.data;
                console.log('objReceta', objReceta);
                setReceta(objReceta);


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
            "precio": precio,
            "categoria_id": categoria_id,
            "receta_id": receta_id,
        };
        if (id === 0) {
            insertarProducto(params);
        } else {
            actualizarProducto(params);
        }
    }
    const insertarProducto = (params) => {

        const url = 'http://127.0.0.1:8000/api/producto';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/producto');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarProducto = (params) => {

        const url = 'http://127.0.0.1:8000/api/producto/' + id + '/';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/producto');
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
                        <Card.Title>Formulario de Producto</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>

                        <div><label>Precio:</label></div>
                        <div><input className="form-control" type="text" value={precio} onChange={(e) => {
                            setPrecio(e.target.value);
                        }} /></div>

                        <div><label>Categoria:</label></div>
                        <select name="categorias" className='form-control' onChange={(e) => {
                            setCategoria_id(e.target.value);
                        }}>
                            {categoria.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                            )
                            )}
                        </select>

                        <div><label>Receta:</label></div>
                        <select name="receta" className='form-control' onChange={(e) => {
                            setReceta_id(e.target.value);
                        }}>
                            {receta.map(elemento => (
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

export default FormProducto;