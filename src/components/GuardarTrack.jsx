import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/scrolling.css';
import backgroundImage from '../images/fondo.jpeg';

const GuardarTrack = ({ navigate }) => {
    const [track, setTrack] = useState('');
    const [artista, setArtista] = useState('');
    const [genero, setGenero] = useState('');

    const guardarTrack = (evt) => {
        evt.preventDefault();

        if (!track.trim() || !artista.trim() || !genero.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Todos los campos son obligatorios",
                icon: "error"
            });
            return;
        }

        const newTrack = { track, artista, genero };

        axios.post('http://localhost:8080/api-traks/post-guardar-track', newTrack)
            .then(() => {
                Swal.fire("¡Agregado correctamente!", "", "success");
                navigate('mostrarTracks');
            })
            .catch(error => {
                console.error("Hubo un error al agregar el track!", error);
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
                    overflow: 'hidden',
                }}
            >
                <div className="container">
                    <h1 className='text-center mt-3' style={{ color: 'white' }}>Track a Guardar</h1>
                    <hr />
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={guardarTrack}>
                                <div className="mb-3">
                                    <input
                                        style={{ backgroundColor: '#151922', color: 'white' }}
                                        type="text"
                                        placeholder='Track'
                                        className='form-control'
                                        onChange={(evt) => setTrack(evt.target.value)}
                                        value={track}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        style={{ backgroundColor: '#151922', color: 'white' }}
                                        type="text"
                                        placeholder='Artista'
                                        className='form-control'
                                        onChange={(evt) => setArtista(evt.target.value)}
                                        value={artista}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        style={{ backgroundColor: '#151922', color: 'white' }}  
                                        type="text"
                                        placeholder='Género'
                                        className='form-control'
                                        onChange={(evt) => setGenero(evt.target.value)}
                                        value={genero}
                                    />
                                </div>
                                <button type='submit' className='btn btn-block btn-dark'>
                                    Agregar Canción
                                </button>
                                <div className="d-flex justify-content-center mb-10 mt-3">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GuardarTrack;
