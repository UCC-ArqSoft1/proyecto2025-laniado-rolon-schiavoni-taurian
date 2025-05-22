import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


const Activities = () => { //siempre con mayuscula la funcion

    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/activities') //hago la peticion como postman, llamda http
            .then((rest) => rest.json())

            .then((data) => {
                setActivities(data);
            })

            .catch((err) => {
                console.error("Error fetching activities:", err);
            });

    }, []);

    return (
        <div>
            <h2>Actividades</h2>
            <div>
                {activities.map((activity) => (
                    <div key={activity.id}>
                        <h3>{activity.name}</h3>
                        <p>{activity.description}</p>
                        <button onClick={() => navigate(`/activities/${activity.id}`)}>
                            Ver detalles
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Activities;