import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditActivity = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    profesor_name: "",
    quotas: "",
    day: "",
    hour_start: "",
    active: true,
    photo: ""
  });
  const [original, setOriginal] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos actuales de la actividad
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    fetch(`http://localhost:8080/activities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOriginal(data);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Solo enviar los campos que NO están vacíos, el resto se mantiene igual
    const formToSend = {};
    Object.keys(form).forEach((key) => {
      if (form[key] !== "" && form[key] !== null && form[key] !== undefined) {
        formToSend[key] = key === "quotas" ? Number(form[key]) : form[key];
      } else if (original[key] !== undefined) {
        formToSend[key] = original[key];
      }
    });

    fetch(`http://localhost:8080/activity/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formToSend),
    })
      .then((res) => {
        if (res.ok) {
          alert("Actividad editada con éxito");
          navigate("/users/admin");
        } else {
          alert("Error al editar la actividad");
        }
      })
      .catch(() => alert("Error al editar la actividad"));
  };

  return (
    <form onSubmit={handleSubmit} className="create-activity-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="profesor_name" placeholder="Professor Name" value={form.professor_name} onChange={handleChange} />
      <input name="quotas" type="number" placeholder="Quotas" value={form.quotas} onChange={handleChange} />
      <input name="day" placeholder="Day" value={form.day} onChange={handleChange} />
      <input name="hour_start" placeholder="Hour Start" value={form.hour_start} onChange={handleChange} />
      <input name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} />
      <button type="submit">Editar Actividad</button>
    </form>
  );
};

export default EditActivity;