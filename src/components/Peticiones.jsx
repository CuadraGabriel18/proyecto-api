import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/musica.css';

const Peticiones = ({ navigate }) => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand style={{ color: '#ccc' }}>Mi Proyecto Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden', // Prevents scrolling
      }}
    >
      <div className="title-container mb-5"> {/* Agregamos margen inferior para separar del siguiente contenido */}
        <h1 style={{ color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>¿Qué deseas realizar?</h1>
      </div>
      
      <section className="music">
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
        <section className="bar"></section>
      </section>
    </section>
  </>
);

export default Peticiones;
