import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Inscription = () => {
    const { id: activityId } = useParams();
    const navigate = useNavigate();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let alreadySubmitted = false; // bandera local para prevenir doble ejecución

        const userId = localStorage.getItem("userID");
        if (!userId) {
            alert("Debe iniciar sesión para inscribirse.");
            navigate("/login");
            return;
        }

        if (!alreadySubmitted && !hasSubmitted) {
            alreadySubmitted = true;

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
                    navigate("/activities"); // opcional: redirigir después
                })
                .catch((err) => {
                    console.error(err);
                    alert("Hubo un error al inscribirse.");
                });
        }
    }, [activityId, hasSubmitted, navigate]);

    return <p>Procesando inscripción...</p>;
};

export default Inscription;
