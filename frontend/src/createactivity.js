import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateActivity = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
        const formToSend = { ...form, quotas: Number(form.quotas) };

    fetch("http://localhost:8080/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formToSend),
      //Así, quotas se convierte a número y el backend puede procesarlo correctamente.
      //Si envías form directamente, quotas sigue siendo string y el backend responde con 400 Bad Request.
    })
      .then((res) => {
        if (res.ok) {
          alert("Actividad creada con éxito");
          navigate("/activities");
        } else {
          alert("Error al crear la actividad");
        }
      })
      .catch(() => alert("Error al crear la actividad"));
  };

  return (
    <form onSubmit={handleSubmit} className="create-activity-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="profesor_name" placeholder="Professor Name" value={form.professor_name} onChange={handleChange} required />
      <input name="quotas" type="number" placeholder="Quotas" value={form.quotas} onChange={handleChange} required />
      <input name="day" placeholder="Day" value={form.day} onChange={handleChange} required />
      <input name="hour_start" placeholder="Hour Start" value={form.hour_start} onChange={handleChange} required />
      <input name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} />
      <button type="submit">Crear Actividad</button>
    </form>
  );
};

export default CreateActivity;