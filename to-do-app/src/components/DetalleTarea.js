import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Badge } from 'react-bootstrap';

const DetalleTarea = () => {
  const { id } = useParams();
  const [tarea, setTarea] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5031/api/Tareas/${id}`)
      .then(response => response.json())
      .then(data => setTarea(data))
      .catch(error => {
        console.error('Error encontrando la tarea:', error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5031/api/Tareas/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      navigate('/');
    })
    .catch(error => {
      console.error('Error Borrando la tarea:', error);
    });
  };

  if (!tarea) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>{tarea.titulo}</h1>
          <Badge bg={tarea.completada ? 'success' : 'warning'}>
            {tarea.completada ? 'Completed' : 'Pending'}
          </Badge>
        </Col>
        <Col className="text-end">
          <Link to={`/Tareas/${tarea.id}/edit`}>
            <Button variant="warning" className="me-2">Editar Tarea</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Borrar Tarea</Button>
        </Col>
      </Row>
      <p>{tarea.descripcion}</p>
    </Container>
  );
};

export default DetalleTarea;
