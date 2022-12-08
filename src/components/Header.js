import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sesionCerrada } from '../redux/loginSlice';
import { useHistory } from 'react-router';
const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.login.token);


    useEffect(() => {

        let obj = [
            {
                "nombre": "pizza",
                "precio": 100
            },
            {
                "nombre": "hambuguersa",
                "precio": 100
            },
            {
                "nombre": "taco",
                "precio": 100
            }

        ]

        if (!token) {
            history.push('/login');
        }
    }, [token])

    const cerrarSesion = () => {
        dispatch(sesionCerrada());
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Violeta</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {token &&
                        <Nav className="me-auto">
                            <NavDropdown title="Cliente" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/cliente">Ver Cliente</Link>
                                <Link className="dropdown-item" to="/cliente/create">Crear Cliente</Link>
                            </NavDropdown>

                            <NavDropdown title="Producto" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/producto">Ver Producto</Link>
                                <Link className="dropdown-item" to="/producto/create">Crear Producto</Link>
                            </NavDropdown>

                            <NavDropdown title="Pedido" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/pedido">Ver Pedido</Link>
                                <Link className="dropdown-item" to="/pedido/create">Crear Pedido</Link>
                            </NavDropdown>

                            <NavDropdown title="Categoria" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/categoria">Ver Categoria</Link>
                                <Link className="dropdown-item" to="/categoria/create">Crear Categoria</Link>
                            </NavDropdown>

                            <NavDropdown title="Receta" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/receta">Ver Receta</Link>
                                <Link className="dropdown-item" to="/receta/create">Crear Receta</Link>
                            </NavDropdown>

                            <button className="btn btn-link" onClick={cerrarSesion}>Cerrar sesión</button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;