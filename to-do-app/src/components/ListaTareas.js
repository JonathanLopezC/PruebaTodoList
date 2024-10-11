import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Container } from 'react-bootstrap';

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5031/api/Tareas/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTareas(tareas.filter(tarea => tarea.id !== id));
    })
    .catch(error => {
      console.error('Error borrando la tarea:', error);
    });
  };

  useEffect(() => {
    fetch('http://localhost:5031/api/Tareas')
      .then(response => response.json())
      .then(data => setTareas(data))
      .catch(error => {
        console.error('Error obteniendo tareas:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
    <Link to="/Tareas/Crear">
      <Button variant="success" className="mb-4">Nueva Tarea</Button>
    </Link>
    <h2 className="text-center mb-4">Tareas</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Titulo</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tareas.map(Tarea => (
          <tr key={Tarea.id}>
            <td>{Tarea.id}</td>
            <td>{Tarea.titulo}</td>
            <td>{Tarea.descripcion}</td>
            <td>{Tarea.completada ? "Completada" : "Pendiente"}</td>
            <td>
              <Link to={`/Tareas/${Tarea.id}/Editar`}>
                <Button variant="primary" className="me-2">Editar</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(Tarea.id)}>Borrar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
};



export default ListaTareas;
