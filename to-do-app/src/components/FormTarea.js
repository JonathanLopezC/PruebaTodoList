import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, FormGroup } from 'react-bootstrap';

const FormTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTarea = {
      titulo,
      descripcion,
      completada,
      createdAt: new Date(),
    };

    fetch('http://localhost:5031/api/Tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTarea),
    })
    .then(() => {
      navigate('/');
    })
    .catch(error => {
      console.error('Error creando la tarea:', error);
    });
  };

  return (
    <Container className="mt-4">
    <h1>Crear Tarea</h1>
    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
      <Form.Group className="mb-3 w-50" controlId="titulo">
        <Form.Label>Titulo de la tarea</Form.Label>
        <Form.Control
          type="text"
          placeholder="Titulo de la tarea"
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
      <FormGroup className="mb-3 w-50 d-flex align-items-center" controlId='completada'>
        <Form.Check className="me-2 h-25"
          type="checkbox"
          checked={completada}
          onChange={(e) => setCompletada(e.target.checked)}
          />
        <Form.Label>Completada</Form.Label>
      </FormGroup>
        

      <Button variant="primary" type="submit">
        Crear Tarea
      </Button>
    </Form>
  </Container>
  );
};

export default FormTarea;
