import axios from 'axios';
import React, { useState } from 'react'
import { Card, Col,Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
const FotoEmpresas = (props) => {

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [archivo, setArchivo] = useState('');
    
    const enviarDatos = () => {
        const url = 'http://localhost:3000/imagenes/';
        const data = new FormData();
        data.append("portada", archivo,`${id}.jpg`);
        axios.post(url, data
            ).then(res => {
            history.push('/peliculas');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
            }
        });;
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Subir foto de perfil</Card.Title>
                        <input className="form-control" type="file" onChange={(e) => {
                            // console.log(e.target.files[0])
                            setArchivo(e.target.files[0]);
                        }} />
                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default FotoEmpresas;