import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style_activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/activities')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Actividades</h1>
        <p>Descubrí y participá de nuestras propuestas</p>
      </header>

      <div className="container">
        <div className="row row-cols-1 row-cols-2 row-cols-3 g-6">
          {activities.map((activity) => (
            <div className="col" key={activity.id}>
              <div className="card-activity">
                <img src="https://via.placeholder.com/450x300" alt="Actividad" />
                <div className="card-activity-body d-flex flex-column">
                  <h5 className="card-activity-title">{activity.name}</h5>
                  <p className="card-activity-text">{activity.description}</p>
                  <button
                    className="btn btn-outline-dark card-activity-btn mt-auto"
                    onClick={() => navigate(`/activities/${activity.id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
