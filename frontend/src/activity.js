import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Activity = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/activities/${id}`)
            .then((res) => res.json())
            .then((data) => setActivity(data));
    }, [id]);

    if (!activity) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{activity.name}</h2>
            <p><strong>Descripción:</strong> {activity.description}</p>
            <p><strong>Categoría:</strong> {activity.category}</p>
            <p><strong>Profesor:</strong> {activity.profesor_name}</p>
            <p><strong>Horarios:</strong> {activity.schedules}</p>
            <button onClick={() => navigate(`/users/inscription/${activity.id}`)}>Inscribirme</button>
        </div>
    );
};

export default Activity;
