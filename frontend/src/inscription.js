import { use, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Inscription = () => {
    const { id: activityId } = useParams();
    const navigate = useNavigate();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        // Prevent running twice

        const userId = localStorage.getItem("userID");
        if (!userId) {
            alert("Debe iniciar sesión para inscribirse.");
            navigate("/login");
            return;
        }

        fetch(`http://localhost:8080/activities/${activityId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.inscriptions != null) {
                    for (let index = 0; index < data.inscriptions.length; index++) {
                        if (userId == data.inscriptions[index].user_id) {
                            alert("You have already submitted to this activity.");
                            setHasSubmitted(true);
                            navigate("/activities");
                            return
                        }
                    }
                }
                if (!hasSubmitted) {
                    fetch("http://localhost:8080/users/inscription", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: parseInt(userId),
                            activity_id: parseInt(activityId),
                        }),
                    })
                        .then((response) => {
                            if (!response.ok) throw new Error("Error en la inscripción");
                            return response.json();
                        })
                        .then(() => {
                            alert("Inscripción exitosa!");
                            setHasSubmitted(true);
                            navigate("/activities");
                        })
                        .catch((err) => {
                            console.error(err);
                            alert("Hubo un error al inscribirse.");
                        });
                }
            }
            )
            .catch((err) => {
                console.error(err);
                alert("Error al cargar la actividad.");
            });
    }, []);

    return
};

export default Inscription;
