import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const ListaRecetas = () => {
    const token = localStorage.getItem('token')
   //const permisos = useSelector(state => state.login.permisos);
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        
        obtenerListaRecetas();
    }, []);

    const obtenerListaRecetas = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/receta', {
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
    const eliminarReceta = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/receta/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            ).then((response) => {
                obtenerListaRecetas();
        }).catch(error => {
            console.log(error);
        });
    }
    return <div>
        {cargando === true && <h1>Cargando...</h1>}
        {cargando === false &&
            <Card className="mt-3">

                <Card.Body>
                    <Card.Title>Receta</Card.Title>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>

                                        <td>
                                            <Link className="btn btn-primary" to={"/categoria/edit/" + item.id}>Editar</Link>
                                        </td>
                                    
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { eliminarReceta(item.id) }}>Eliminar</button>
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

export default ListaRecetas;