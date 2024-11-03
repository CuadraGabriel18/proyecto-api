import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import backgroundImage from '../images/fondo.jpeg';

const EditarTrack = ({ navigate }) => {
    const [track, setTrack] = useState('');
    const [artista, setArtista] = useState('');
    const [genero, setGenero] = useState('');
    const [modoEditar, setModoEditar] = useState(false);
    const [listaCanciones, setListaCanciones] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api-traks/get-mostrartodo')
            .then(response => {
                setListaCanciones(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the tracks!", error);
            });
    }, []);

    const limpiarform = () => {
        setTrack('');
        setArtista('');
        setGenero('');
        setId('');
        setModoEditar(false);
    };

    const editarTrack = (cancion) => {
        setModoEditar(true);
        setTrack(cancion.track);
        setArtista(cancion.artista);
        setGenero(cancion.genero);
        setId(cancion.id);
    };

    const editarTrackOk = (evt) => {
        evt.preventDefault();

        if (!track.trim() || !artista.trim() || !genero.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Todos los campos son obligatorios",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Desea Editar Track?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, editarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTrack = { id, track, artista, genero };

                axios.post('http://localhost:8080/api-traks/post-guardar-track', updatedTrack)
                    .then(response => {
                        setListaCanciones(listaCanciones.map(cancion =>
                            cancion.id === id ? response.data : cancion
                        ));
                        limpiarform();
                        Swal.fire({
                            title: "Track Editado!",
                            text: "Tu track ha sido editado",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error("There was an error updating the track!", error);
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
                    overflow: 'hidden',
                    color: 'white',
                }}
            >
                <div className="container">
                    <h1 className='text-center mt-3'>Editar Track</h1>
                    <hr />
                    <section className="row">
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3'>Lista de Tracks</h3>
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
                                                Artista: {cancion.artista}
                                            </span>
                                            <br />
                                            <span>
                                                Género: {cancion.genero}
                                            </span>
                                            <button onClick={() => editarTrack(cancion)} className="btn btn-sm btn-warning float-right mx-2">
                                                Editar
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </section>
                        <section className="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
                            <h3 className='text-center mt-3'>Formulario de Edición</h3>
                            <form onSubmit={editarTrackOk}>
                                <input
                                    style={{ backgroundColor: '#151922', color: 'white' }}
                                    type="text"
                                    placeholder='Track'
                                    className='form-control mb-3'
                                    onChange={(evt) => setTrack(evt.target.value)}
                                    value={track}
                                />
                                <input
                                    style={{ backgroundColor: '#151922', color: 'white' }}
                                    type="text"
                                    placeholder='Artista'
                                    className='form-control mb-3'
                                    onChange={(evt) => setArtista(evt.target.value)}
                                    value={artista}
                                />
                                <input
                                    style={{ backgroundColor: '#151922', color: 'white' }}
                                    type="text"
                                    placeholder='Género'
                                    className='form-control mb-3'
                                    onChange={(evt) => setGenero(evt.target.value)}
                                    value={genero}
                                />
                                <button type='submit' className='btn btn-info btn-block btn-dark'>
                                    Editar Canción
                                </button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>
    );
}

export default EditarTrack;
