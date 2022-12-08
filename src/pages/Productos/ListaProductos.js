import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const ListaProducto = () => {
    const token = localStorage.getItem('token')
   //const permisos = useSelector(state => state.login.permisos);
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        
        obtenerListaProductos();
    }, []);

    const obtenerListaProductos = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/producto', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            console.log('response', response.data);
            console.log(localStorage.getItem('token'));
            
            setLista(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const eliminarProducto = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/producto/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            ).then((response) => {
                obtenerListaProductos();
        }).catch(error => {
            console.log(error);
        });
    }
    return <div>
        {cargando === true && <h1>Cargando...</h1>}
        {cargando === false &&
            <Card className="mt-3">

                <Card.Body>
                    <Card.Title>Productos</Card.Title>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>precio</th>
                                <th>categoria_id</th>
                                <th>receta_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.categoria_id}</td>
                                    <td>{item.receta_id}</td>

                                        <td>
                                            <Link className="btn btn-primary" to={"/producto/edit/" + item.id}>Editar</Link>
                                        </td>
                                    
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { eliminarProducto(item.id) }}>Eliminar</button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        }
    </div >;
}

export default ListaProducto;