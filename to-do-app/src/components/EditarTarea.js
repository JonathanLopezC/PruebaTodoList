import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditarTarea = () => {
  const { id } = useParams(); 
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5031/api/Tareas/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setCompletada(data.completada);
      })
      .catch(error => {
        console.error('Error Obteniendo la tarea:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Tarea = {
      id: id,
      titulo,
      descripcion,
      completada,
      createdAt: new Date(),
    };

    fetch(`http://localhost:5031/api/Tareas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Tarea),
    })
    .then(() => {
      navigate('/'); 
    })
    .catch(error => {
      console.error('Error Editando la tarea:', error);
    });
  };

  return (
    <Container className="mt-4">
      <h1>Editar Tarea</h1>
      <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
        <Form.Group className="mb-3 w-50" controlId="titulo">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50" controlId="descripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripcion de la tarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 d-flex align-items-center" controlId="completada">
          <Form.Check
            type="checkbox"
            label="Completada"
            checked={completada}
            onChange={(e) => setCompletada(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Actualizar Tarea
        </Button>
      </Form>
    </Container>
  );
};

export default EditarTarea;
