import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./style_activities.css";

function SaludoUsuario() {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("surname");
  return (
    <div>
      <h2 className="user-welcome">
        Hello {userName} {userSurname}!
      </h2>
    </div>
  );
}

const Activity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];


    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }


    fetch(`http://localhost:8080/activities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
      },
    })
      .then((res) => res.json())
      .then((data) => setActivity(data));
  }, [id]);

  if (!activity) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <SaludoUsuario />
      <button className="volver-btn" onClick={() => navigate(`/activities`)}>
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
            <strong>Schedule:</strong> {activity.schedules}
          </p>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate(`/users/inscription/${activity.id}`)}
          >
            Join Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
