import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MyActivities.css';

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
        Volver
      </button>
      <div className="my-activities-wrapper">
        <div className="my-activities-container">
          <h2 className="title">Mis Actividades</h2>
          <div className="activities-grid">
            {myActivities.map((activity) => (
              <div className="activity-card" key={activity.id}>
                <h5>{activity.name}</h5>
                <p>{activity.description}</p>
                <button
                  className="ver-detalles-btn"
                  onClick={() => navigate(`/myactivities/${activity.id}`)}
                >
                  Ver detalles
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