import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterSelection = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/set-filters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresa: selectedCompanies,
          fechaInicio: startDate,
          fechaFin: endDate,
        }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setStatusMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatusMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="container">
      <h1>Seleccione los Datos</h1>
      <form onSubmit={handleFilterSubmit}>
        <label>Seleccione una o más empresas:</label>
        <select
          multiple
          value={selectedCompanies}
          onChange={(e) =>
            setSelectedCompanies([...e.target.selectedOptions].map((opt) => opt.value))
          }
        >
          <option value="empresa1">Empresa 1</option>
          <option value="empresa2">Empresa 2</option>
          <option value="empresa3">Empresa 3</option>
        </select>
        <label>Desde:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label>Hasta:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Consultar métricas</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default FilterSelection;
