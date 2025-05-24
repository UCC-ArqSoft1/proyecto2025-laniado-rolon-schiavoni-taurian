import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './style_activities.css';

const Activity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/activities/${id}`)
      .then((res) => res.json())
      .then((data) => setActivity(data));
  }, [id]);

  if (!activity) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container my-5">
      <div className="card-activity">
        <img src="https://via.placeholder.com/450x300" alt="Actividad" />
        <div className="card-activity-body">
          <h2 className="card-activity-title">{activity.name}</h2>
          <p><strong>Descripción:</strong> {activity.description}</p>
          <p><strong>Categoría:</strong> {activity.category}</p>
          <p><strong>Profesor:</strong> {activity.profesor_name}</p>
          <p><strong>Horarios:</strong> {activity.schedules}</p>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate(`/users/inscription/${activity.id}`)}
          >
            Inscribirme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
