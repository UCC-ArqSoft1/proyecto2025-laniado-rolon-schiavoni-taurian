import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style_activities.css";

const MyActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    fetch(`http://localhost:8080/activities/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setActivity(data));
  }, [id, token]);

  if (!activity) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container my-5">
      <button
        className="volver-btn"
        onClick={() => navigate(`/users/activities`)}
      >
        Go back
      </button>
      <div className="card-activity">
        <img src={activity.photo} alt="Actividad" />
        <div className="card-activity-body">
          <h2 className="card-activity-title">{activity.name}</h2>
          <p>
            <strong>Description:</strong> {activity.description}
          </p>
          <p>
            <strong>Category:</strong> {activity.category}
          </p>
          <p>
            <strong>Professor:</strong> {activity.profesor_name}
          </p>
          <p>
            <strong>Day:</strong> {activity.day}
          </p>
          <p>
            <strong>Start Hour:</strong> {activity.hour_start}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
