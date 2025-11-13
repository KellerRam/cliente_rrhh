import React, { useEffect, useState } from "react";
import { getEmpleadosConSucursal } from "./services/empleadoService"; // ← Cambiar import

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      setLoading(true);
      setError(null);
      try {
        // Cambiar a la nueva función
        const data = await getEmpleadosConSucursal();
        // Validamos que recibimos un array
        setEmpleados(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.response) {
          setError(`Error servidor: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          setError("No se recibió respuesta del servidor. ¿El backend está corriendo?");
        } else {
          setError(err.message || "Error desconocido");
        }
        console.error("Detalle error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Listado de empleados con sucursal</h1>

      {loading && <p>Cargando empleados...</p>}

      {error && (
        <div style={{ color: 'red' }}>
          <p>Error al cargar empleados: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div>
          <p>Total de empleados: {empleados.length}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {empleados.length === 0 ? (
              <li>No hay empleados.</li>
            ) : (
              empleados.map((emp) => (
                <li key={emp.idempleado} style={{ 
                  border: '1px solid #ddd', 
                  margin: '10px 0', 
                  padding: '15px',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <strong>{emp.nombres} {emp.apellidos}</strong>
                  <br />
                  ID: {emp.idempleado}
                  <br />
                  Teléfono: {emp.telefono}
                  <br />
                  Dirección: {emp.direccion}
                  <br />
                  Salario: Q{emp.salario_base}
                  <br />
                  <span style={{ 
                    color: 'green', 
                    fontWeight: 'bold' 
                  }}>
                    Sucursal: {emp.sucursal || emp.nombre_sucursal || 'No asignada'}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;