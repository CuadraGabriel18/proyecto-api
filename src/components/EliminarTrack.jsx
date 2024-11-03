import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import backgroundImage from '../images/fondo.jpeg';

const EliminarTrack = ({ navigate }) => {
    const [eliminarId, setEliminarId] = useState('');
    const [listaCanciones, setListaCanciones] = useState([]);

    const eliminarTrackPorId = (evt) => {
        evt.preventDefault();

        if (!eliminarId.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Por favor ingresa un ID válido para eliminar el track",
                icon: "error"
            });
            return;
        }

        const idEliminar = parseInt(eliminarId);

        if (!listaCanciones.some(cancion => cancion.id === idEliminar)) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "El ID del track que intentas eliminar no existe en la lista",
                icon: "error"
            });
            return;
        }

        confirmarEliminacion(idEliminar);
    };

    const confirmarEliminacion = (idEliminar) => {
        Swal.fire({
            title: "¿Seguro que deseas eliminar el track con este ID?",
            text: "Después de eliminar, no se podrán revertir los cambios",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api-traks/delete-borrar-track/${idEliminar}`)
                    .then(() => {
                        Swal.fire({
                            title: "Track eliminado",
                            text: "El track ha sido eliminado exitosamente",
                            icon: "success"
                        }).then(() => {
                            axios.get('http://localhost:8080/api-traks/get-mostrartodo')
                                .then(response => {
                                    setListaCanciones(response.data);
                                    setEliminarId('');
                                })
                                .catch(error => {
                                    console.error("Hubo un error al obtener la lista de canciones!", error);
                                });
                        });
                    })
                    .catch(error => {
                        console.error("Hubo un error al eliminar el track!", error);
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un error al eliminar el track. Por favor, intenta nuevamente.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api-traks/get-mostrartodo')
            .then(response => {
                setListaCanciones(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener la lista de canciones!", error);
            });
    }, []);

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
                    color: 'white',
                }}
            >
                <div className="container">
                    <h1 className='text-center mt-3'>Eliminar Track</h1>
                    <hr />
                    <section className="row">
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3'>Lista de Tracks</h3>
                            <ul className='list-group scrolling-list'>
                                {listaCanciones.length === 0 ? (
                                    <li className='list-group-item'>No Hay Tracks Para Mostrar</li>
                                ) : (
                                    listaCanciones.map(cancion => (
                                        <li key={cancion.id} className='list-group-item d-flex justify-content-between align-items-center' style={{ backgroundColor: '#151922', color: 'white' }}>
                                            <span>
                                                {cancion.id}.-
                                                <br />
                                                Canción: {cancion.track}
                                                <br />
                                                Artista: {cancion.artista}
                                                <br />
                                                Género: {cancion.genero}
                                            </span>
                                            <button 
                                                onClick={() => confirmarEliminacion(cancion.id)} 
                                                className="btn btn-sm btn-danger float-right mx-2"
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </section>
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3' style={{ color: 'white' }}>Escoja El Numero De Track Que Deseas Eliminar</h3>
                            <form onSubmit={eliminarTrackPorId}>
                                <input
                                    style={{ backgroundColor: '#151922', color: 'white' }}
                                    type="text"
                                    placeholder='ID del track a eliminar'
                                    className='form-control mb-3'
                                    onChange={(evt) => setEliminarId(evt.target.value)}
                                    value={eliminarId}
                                />
                                <button type='submit' className='btn btn-danger btn-block btn-dark' style={{ color: 'Red' }}>
                                    Eliminar
                                </button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>
    );
};

export default EliminarTrack;

