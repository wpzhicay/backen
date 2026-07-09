import { useState, useEffect } from 'react';

export default function Home() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAlert = () => {
    alert('¡Hola! Este es un mensaje de alerta desde A.D.A Solar');
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.logo}>☀️</div>
          <h1 style={styles.title}>A.D.A Solar</h1>
          <p style={styles.subtitle}>Sistema de Gestión de Energía Solar</p>
        </div>

        <div style={styles.content}>
          <div style={styles.statusCard}>
            <h2 style={styles.cardTitle}>Estado del Sistema</h2>
            {loading ? (
              <p style={styles.loading}>Verificando...</p>
            ) : health ? (
              <div style={styles.statusBadge}>
                <span style={styles.statusDot}>●</span>
                <span style={styles.statusText}>En línea</span>
              </div>
            ) : (
              <p style={styles.error}>Error de conexión</p>
            )}
          </div>

          <div style={styles.endpointsCard}>
            <h2 style={styles.cardTitle}>Endpoints Disponibles</h2>
            <div style={styles.endpointsList}>
              <div style={styles.endpoint}>
                <span style={styles.methodGet}>GET</span>
                <span style={styles.path}>/api/health</span>
                <span style={styles.desc}>Verificación de salud</span>
              </div>
              <div style={styles.endpoint}>
                <span style={styles.methodPost}>POST</span>
                <span style={styles.path}>/api/auth/signup</span>
                <span style={styles.desc}>Registro de usuarios</span>
              </div>
              <div style={styles.endpoint}>
                <span style={styles.methodPost}>POST</span>
                <span style={styles.path}>/api/auth/login</span>
                <span style={styles.desc}>Iniciar sesión</span>
              </div>
              <div style={styles.endpoint}>
                <span style={styles.methodGet}>GET</span>
                <span style={styles.path}>/api/users</span>
                <span style={styles.desc}>Obtener usuarios (protegido)</span>
              </div>
              <div style={styles.endpoint}>
                <span style={styles.methodGet}>GET</span>
                <span style={styles.path}>/api/solar-panels</span>
                <span style={styles.desc}>Obtener paneles</span>
              </div>
            </div>
            <button onClick={handleAlert} style={styles.button}>
              Mostrar Alerta
            </button>
          </div>
        </div>

        <div style={styles.footer}>
          <p>A.D.A Solar Management System v1.0.0</p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  main: {
    width: '100%',
    maxWidth: '900px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '60px 40px',
    textAlign: 'center' as const,
  },
  logo: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.9,
  },
  content: {
    padding: '40px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '30px',
  },
  statusCard: {
    background: '#f8f9fa',
    padding: '30px',
    borderRadius: '15px',
    border: '2px solid #667eea',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  endpointsCard: {
    background: '#f8f9fa',
    padding: '30px',
    borderRadius: '15px',
    border: '2px solid #667eea',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statusDot: {
    fontSize: '24px',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    color: '#22c55e',
  },
  loading: {
    color: '#666',
    fontSize: '16px',
  },
  error: {
    color: '#ef4444',
    fontSize: '16px',
  },
  endpointsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  endpoint: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    background: 'white',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea',
  },
  methodGet: {
    background: '#3b82f6',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '50px',
    textAlign: 'center' as const,
  },
  methodPost: {
    background: '#10b981',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '50px',
    textAlign: 'center' as const,
  },
  path: {
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    fontWeight: '600',
    color: '#667eea',
    flex: 1,
  },
  desc: {
    fontSize: '13px',
    color: '#999',
  },
  footer: {
    background: '#f8f9fa',
    color: '#666',
    padding: '20px',
    textAlign: 'center' as const,
    borderTop: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    marginTop: '20px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    width: '100%',
  },
};
