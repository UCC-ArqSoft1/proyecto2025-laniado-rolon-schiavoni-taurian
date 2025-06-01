import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './style_myactivities.css';

// Hook personalizado para manejar la autenticación
function useAuth() {
  const navigate = useNavigate();

  const getUserIDFromToken = () => {
    try {

      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));

      if (!tokenCookie) {
        alert("No estás autenticado. Por favor, inicia sesión.");
        navigate("/login");
        return null;
      }

      const token = tokenCookie.split('=')[1];

      // Verificar que el token tenga el formato JWT (3 partes separadas por puntos)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Token no tiene el formato JWT válido');
      }

      const payload = JSON.parse(atob(tokenParts[1]));

      // Verificar diferentes posibles nombres para el user ID
      const userID = payload.jti;

      if (!userID) {
        console.error('No se encontró user_id en el payload del token');
        alert("No se pudo obtener el ID de usuario. Por favor, inicia sesión nuevamente.");
        navigate("/login");
        return null;
      }

      const parsedUserID = parseInt(userID);

      if (isNaN(parsedUserID)) {
        console.error('User ID no es un número válido');
        alert("ID de usuario inválido. Por favor, inicia sesión nuevamente.");
        navigate("/login");
        return null;
      }

      return parsedUserID;
    } catch (error) {
      console.error('Error al procesar el token:', error);
      console.error('Stack trace:', error.stack);
      alert("Token inválido. Por favor, inicia sesión nuevamente.");
      navigate("/login");
      return null;
    }
  };
  const id = getUserIDFromToken();

  return id;
}


function SaludoUsuario() {

  const userFirstName = localStorage.getItem("userName");
  const userLastName = localStorage.getItem("surname");

  return (
    <div>
      <h2 className="user-welcome">Hello {userFirstName} {userLastName}!</h2>
    </div>
  );
}

const MyActivities = () => {
  const userID = useAuth();
  const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasRun = useRef(false);


  // Cargar actividades cuando tenemos el userID
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (userID) {
      fetch(`http://localhost:8080/users/${userID}/activities`, {
        headers: {
          'Authorization': `${token}`,
        }
      })
        .then((res) => {
          if (res.status === 401) {
            alert("No estás autenticado. Por favor, inicia sesión.");
            navigate("/login");
            return null;
          }
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setMyActivities(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user activities:", err);
          setLoading(false);
        });
    }
  }, [userID]);

  if (!userID) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div>
      <button
        className="volver-btn"
        onClick={() => navigate(`/activities`)}
      >
        Go back
      </button>

      <SaludoUsuario userID={userID} />

      <div className="my-activities-wrapper">
        <h2 className="title">My Activities</h2>
        <div className="my-activities-container">
          {loading ? (
            <p>Cargando actividades...</p>
          ) : (
            <div className="activities-grid">
              {myActivities && myActivities.length > 0 ? (
                myActivities.map((activity) => (
                  <div className="activity-card" key={activity.id}>
                    <h5>{activity.name}</h5>
                    <p>{activity.description}</p>
                    <button
                      className="ver-detalles-btn"
                      onClick={() => navigate(`/myactivities/${activity.id}`)}
                    >
                      view details
                    </button>
                  </div>
                ))
              ) : (
                <p>No tienes actividades registradas.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyActivities;