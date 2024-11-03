import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/scrolling.css';
import backgroundImage from '../images/fondo.jpeg';

const MostrarTracks = ({ navigate }) => {
    const [list, setListaCanciones] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    const obtenerTracks = () => {
        axios.get('http://localhost:8080/api-traks/get-mostrartodo')
            .then(response => {
                setListaCanciones(response.data);
                setMostrar(true);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las canciones!", error);
            });
    };

    const eliminarTrack = (id) => {
        Swal.fire({
            title: "¿Desea eliminar el track?",
            text: "¡Después de eliminar no se podrán revertir los cambios!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api-traks/delete-borrar-track/${id}`)
                    .then(() => {
                        setListaCanciones(list.filter(cancion => cancion.id !== id));
                        Swal.fire({
                            title: "¡Track eliminado!",
                            text: "Tu track ha sido eliminado",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error("Hubo un error al eliminar el track!", error);
                    });
            }
        });
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand style={{ color: '#ccc' }}>Mi Proyecto Api</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('segunda')}>Inicio</Nav.Link>
                            <Nav.Link onClick={() => navigate('mostrarTracks')}>Mostrar Tracks</Nav.Link>
                            <Nav.Link onClick={() => navigate('buscarTracks')}>Buscar Track</Nav.Link>
                            <Nav.Link onClick={() => navigate('guardarTrack')}>Guardar Track</Nav.Link>
                            <Nav.Link onClick={() => navigate('editarTrack')}>Editar Track</Nav.Link>
                            <Nav.Link onClick={() => navigate('eliminarTrack')}>Eliminar Track</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section
                className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden', // Prevents scrolling
                }}
            >
                <div className="container">
                    <h1 className='text-center mt-3' style={{ color: 'white' }}>Lista De Tracks</h1>
                    <hr />
                    {!mostrar && (
                        <ul className='list-group'>
                            <li className='list-group-item' style={{ backgroundColor: '#151922', color: 'white' }} >No Hay Tracks Para Mostrar</li>
                        </ul>
                    )}
                    {mostrar && (
                        <ul className='list-group scrolling-list'>
                            {list.length === 0 ? (
                                <li className='list-group-item'  >No Hay Tracks Para Mostrar</li>
                            ) : (
                                list.map((cancion) => (
                                    <li key={cancion.id} className='list-group-item' style={{ backgroundColor: '#151922', color: 'white' }}>
                                        <span>
                                            {cancion.id}.-
                                            <br />
                                            Canción: {cancion.track}
                                        </span>
                                        <br />
                                        <span>
                                            Artista: {cancion.artista}</span>
                                        <br />
                                        <span>
                                            Género: {cancion.genero}</span>
                                        <button onClick={() => eliminarTrack(cancion.id)} className="btn btn-sm btn-danger float-right">
                                            Eliminar
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                    <div className="d-flex justify-content-center mb-10 mt-3">
                        <button onClick={obtenerTracks} className="btn btn-primary mb-3 btn-dark">Mostrar Tracks</button>
                        <button onClick={() => navigate('guardarTrack')} className="btn btn-primary mb-3 btn-dark ml-3">Seguir Guardando</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MostrarTracks;

