import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/get-chart-data');
      const data = await response.json();
      setChartData(data);
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Cargando gráficos...</p>;

  return (
    <div className="container">
      <h1>Resultados</h1>
      <Bar
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets,
        }}
      />
    </div>
  );
};

export default Dashboard;
