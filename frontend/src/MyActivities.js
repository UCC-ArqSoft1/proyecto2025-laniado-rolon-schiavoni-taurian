import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style_myactivities.css';

function SaludoUsuario() {
  const userID = localStorage.getItem("userID");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:8080/users/${userID}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error('Error al cargar usuario:', err));
    }
  }, []);

  return (
    <div>
      {user ? <h2 className="user-welcome">Hello {user.first_name} {user.last_name}!</h2> : <p className="user-welcome">Cargando usuario...</p>}
    </div>
  );
}

const MyActivities = () => {
  const [myActivities, setMyActivities] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userID}/activities`)
      .then((res) => res.json())
      .then((data) => setMyActivities(data))
      .catch((err) => console.error("Error fetching user activities:", err));
  }, [userID]);

  return (
    <div>
      <button
        className="volver-btn"
        onClick={() => navigate(`/activities`)}
      >
        Go back
      </button>
      <SaludoUsuario/>
      <div className="my-activities-wrapper">
        <h2 className="title">My Activities</h2>
        <div className="my-activities-container">
          <div className="activities-grid">
            {myActivities.map((activity) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;