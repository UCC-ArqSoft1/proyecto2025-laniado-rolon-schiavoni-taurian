import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "./authToken";

const Inscription = () => {
  const { id: activityId } = useParams();
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasRun = useRef(false);
  const userID = useAuth();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    // Prevent running twice

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    fetch(`http://localhost:8080/activities/${activityId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.inscriptions != null) {
          for (let index = 0; index < data.inscriptions.length; index++) {
            if (userID === data.inscriptions[index].user_id) {
              alert("You have already submitted to this activity.");
              setHasSubmitted(true);
              navigate("/activities");
              return;
            }
          }

          if (data.inscriptions.length >= data.quotas) {
            alert("No hay más plazas disponibles para esta actividad.");
            setHasSubmitted(true);
            navigate("/activities");
            return;
          }
        }

        if (!hasSubmitted) {
          fetch("http://localhost:8080/users/inscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
            },
            body: JSON.stringify({
              user_id: parseInt(userID),
              activity_id: parseInt(activityId),
            }),
          })
            .then((response) => {
              if (response.status === 401) {
                alert("No estás autenticado. Por favor, inicia sesión.");
                navigate("/login");
                throw new Error("Unauthorized");
              }
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
              if (err.message !== "Unauthorized") {
                alert("Hubo un error al inscribirse.");
              }
            });
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error al cargar la actividad.");
      });
  }, [activityId, hasSubmitted, navigate, userID]);

  return null;
};

export default Inscription;
