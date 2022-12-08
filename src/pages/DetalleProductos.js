import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from "./styles.module.css";

let carrito2 = [];

const DetalleProductos = (props) => {
    //console.log(useParams())
    const { id } = useParams()
    const token = useSelector(state => state.login.token)

    //  const { id } = props.match ? props.match.params : { id: 0 };

    const [detalle, setDetalle] = useState([]);
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        obtenerListaEmpresas();
    }, [id]);

    const SetData = (item) => {
        console.log(item)

        let obj = {
            "nombre": item.nombres,
            "precio": item.precio
        }
        carrito2.push(obj)
    }

    const SetDataCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito2))
        setCartItems(JSON.parse(localStorage.getItem('carrito')))
        //localStorage.setItem('carrito', JSON.stringify(obj));
        
    }
    const GuardarCarrito = () => {
        axios.get('http://localhost:3000/api/categorias/categorias/todas/', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('response', response.data[0].productos);
            const objProducto = response.data;

            
            setDetalle(objProducto);


        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
            }
        });
        console.log(cartItems)
    }

    const obtenerListaEmpresas = () => {
        axios.get('http://localhost:3000/api/categorias/categorias/todas/', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('response', response.data[0].productos);
            const objProducto = response.data;

            
            setDetalle(objProducto);


        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
            }
        });
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>nombres</th>
                    <th>Producto</th>

                </tr>
            </thead>
            <tbody>
                {detalle.map(item => {
                    console.log(item);
                    return (<tr key={"item-" + item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombres}</td>
                        <td>{item.productos.map(producto => {
                            return (<><li>{producto.nombres}</li><li>
                                <Button onClick={() => SetData(producto)}>save</Button>

                            </li></>
                            )
                        })}</td>

                    </tr>)
                }
                )}
                <Button onClick={() => SetDataCarrito()}>Agregar al carrito</Button>
                <Button onClick={() => setCartOpen(!cartOpen)}>carrito</Button>
                {cartOpen && (
                    <div className={styles.cart}>
                        <h2>Tu carrito</h2>
                        {cartItems.length === 0 ? (
                            <p className={styles.cartVacio}>Tu carrito esta vacio</p>
                        ) : (
                            <div className={styles.productsContainer}>
                                {cartItems.map((item, i) => (
                                    <>
                                    <p>{item.nombre}</p>
                                    <p>{item.precio}</p>
                                    </>
                                ))}
                            </div>

                        )}
                        <h2 className={styles.total}>Total: ${0}</h2>
                        <Link className="btn btn-primary" to={"/mapas"} onClick={() => GuardarCarrito()}>Comprar</Link>


                    </div>
                )}
            </tbody>
        </table>

    );
}

export default DetalleProductos;