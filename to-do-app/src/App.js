import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ListaTareas from './components/ListaTareas';
import FormTarea from './components/FormTarea';
import DetalleTarea from './components/DetalleTarea';
import EditarTarea from './components/EditarTarea';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<ListaTareas/>} />
          <Route path='/Tareas/Crear' element={<FormTarea/>} />
          <Route path='/Tareas/:id' element={<DetalleTarea/>} />
          <Route path='/Tareas/:id/Editar' element={<EditarTarea/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
