import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import backgroundImage from '../images/fondo.jpeg';

const BuscarTrack = ({ navigate }) => {
    const [buscarId, setBuscarId] = useState('');
    const [busqueda, setBusqueda] = useState(null);
    const [listaCanciones, setListaCanciones] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        obtenerTracks();
    }, []);

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

    const buscarTrackPorId = (evt) => {
        evt.preventDefault();

        axios.get(`http://localhost:8080/api-traks/get-mostrar-track/${buscarId}`)
            .then(response => {
                if (response.data) {
                    setBusqueda(response.data);
                } else {
                    setBusqueda(null);
                    Swal.fire({
                        title: "Canciones TESJI",
                        text: "No se encontró el track con el ID proporcionado",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error("Hubo un error al buscar el track!", error);
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
                        setListaCanciones(listaCanciones.filter(cancion => cancion.id !== id));
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
                    color: 'white', // Text color
                }}
            >
                <div className="container">
                    <h1 className='text-center mt-3'>Buscar Track</h1>
                    <hr />
                    <section className="row">
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3'>Lista de Tracks</h3>
                            {mostrar ? (
                                <ul className='list-group scrolling-list'>
                                    {listaCanciones.length === 0 ? (
                                        <li className='list-group-item'>No Hay Tracks Para Mostrar</li>
                                    ) : (
                                        listaCanciones.map((cancion) => (
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
                                            </li>
                                        ))
                                    )}
                                </ul>
                            ) : null}
                        </section>
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3'>Buscar Numero De Track</h3>
                            <form onSubmit={buscarTrackPorId}>
                                <input
                                    style={{ backgroundColor: '#151922', color: 'white' }}
                                    type="text"
                                    placeholder='Buscar Track Por Numero'
                                    className='form-control mb-3'
                                    onChange={(evt) => setBuscarId(evt.target.value)}
                                    value={buscarId}
                                />
                                <button type='submit' className='btn btn-info btn-block btn-dark'>
                                    Buscar
                                </button>
                            </form>
                            <hr />
                            <h3 className='text-center mt-3'>Resultado De La Búsqueda</h3>
                            <ul className='list-group scrolling-list'>
                                {busqueda ? (
                                    <li key={busqueda.id} className='list-group-item' style={{ backgroundColor: '#151922', color: '#00FF00' }}>
                                        <span>
                                            {busqueda.id}.-
                                            <br />
                                            Canción: {busqueda.track}
                                        </span>
                                        <br />
                                        <span>
                                            Artista: {busqueda.artista}</span>
                                        <br />
                                        <span>
                                            Género: {busqueda.genero}</span>
                                    </li>
                                ) : (
                                    <li className='list-group-item'style={{ backgroundColor: '#151922', color: 'white' }}>No se ha realizado ninguna búsqueda aún.</li>
                                )}
                            </ul>
                        </section>
                    </section>
                </div>
            </section>
        </>
    );
};

export default BuscarTrack;

