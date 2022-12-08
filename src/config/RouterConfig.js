import React from 'react'
import { Route, Switch } from 'react-router';

import ListaClientes from '../pages/Cliente/ListaClientes';
import FormCliente from '../pages/Cliente/FormCliente';

import ListaPedido from '../pages/Pedido/ListaPedido';
import FormPedido from '../pages/Pedido/FormPedido';

import ListaProducto from '../pages/Productos/ListaProductos';
import FormProducto from '../pages/Productos/FormProducto';

import ListaCategoria from '../pages/Categoria/ListaCategorias';
import FormCategoria from '../pages/Categoria/FormCategoria';

import ListaReceta from '../pages/Receta/ListaRecetas';
import FormReceta from '../pages/Receta/FormReceta';

import Login from '../pages/Login';

import FotoEmpresas from '../pages/FotoEmpresa';
import FotoProducto from '../pages/FotoProducto';

const RouterConfig = () => {
    return (
        <Switch>


            <Route path="/cliente" exact>
                <ListaClientes/>
            </Route>

            <Route path="/cliente/create">
                <FormCliente />
            </Route>

            <Route path="/cliente/edit/:id" component={FormCliente}>
            </Route>


            <Route path="/pedido" exact>
                <ListaPedido/>
            </Route>

            <Route path="/pedido/create">
                <FormPedido />
            </Route>

            <Route path="/pedido/edit/:id" component={FormPedido}>
            </Route>


            <Route path="/producto" exact>
                <ListaProducto/>
            </Route>

            <Route path="/producto/create" exact>
                <FormProducto />
            </Route>

            <Route path="/producto/edit/:id" component={FormProducto}>
            </Route>


            <Route path="/categoria" exact>
                <ListaCategoria/>
            </Route>

            <Route path="/categoria/create">
                <FormCategoria />
            </Route>

            <Route path="/categoria/edit/:id" component={FormCategoria}>
            </Route>


            <Route path="/receta" exact>
                <ListaReceta/>
            </Route>

            <Route path="/receta/create">
                <FormReceta />
            </Route>

            <Route path="/receta/edit/:id" component={FormReceta}>
            </Route>



            <Route path="/login" exact>
                <Login />
            </Route>

            { <Route path="/peliculas/foto/:id" component={FotoEmpresas}>
            </Route> }
            { <Route path="/producto/foto/:id" component={FotoProducto}>
            </Route> }



            <Route path="/">
                <Login />
            </Route>
        </Switch>
    );
}

export default RouterConfig;