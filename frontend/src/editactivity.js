import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editactivity.css";

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
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");

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

        setForm({
          name: data.name || "",
          category: data.category || "",
          description: data.description || "",
          profesor_name: data.profesor_name || "",
          quotas: data.quotas?.toString() || "",
          day: data.day || "",
          hour_start: data.hour_start || "",
          active: data.active ?? true,
          photo: data.photo || "",
        });

        if (data.hour_start) {
          const [h, m, s] = data.hour_start.split(":");
          setHour(h || "");
          setMinute(m || "");
          setSecond(s || "");
        }
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHourChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    if (e.target.name === "hour") setHour(value.slice(0, 2));
    if (e.target.name === "minute") setMinute(value.slice(0, 2));
    if (e.target.name === "second") setSecond(value.slice(0, 2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const hour_start = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;

    const formToSend = {};
    Object.keys(form).forEach((key) => {
      if (form[key] !== "" && form[key] !== null && form[key] !== undefined) {
        formToSend[key] = key === "quotas" ? Number(form[key]) : form[key];
      } else if (original[key] !== undefined) {
        formToSend[key] = original[key];
      }
    });

    formToSend.hour_start =
      hour !== "" || minute !== "" || second !== ""
        ? hour_start
        : original.hour_start;

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
        } else if (res.status === 401 || res.status === 403) {
          alert("No estás autenticado. Por favor, inicia sesión.");
          navigate("/login");
        } else {
          alert(`Error: ${res.status}. No se pudo crear la actividad.`);
        }
      })
      .catch(() => alert("Error al editar la actividad"));
  };

  return (
    <div>
      <button className="volver-btn" onClick={() => navigate(`/users/admin`)}>
        Go back
      </button>
      <form onSubmit={handleSubmit} className="edit-activity-form">
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="name">Name:</label>
          <input id="name" name="name" className="edit-activity-input" placeholder="Name" value={form.name} onChange={handleChange} />
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="category">Category:</label>
          <input id="category" name="category" className="edit-activity-input" placeholder="Category" value={form.category} onChange={handleChange} />
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="description">Description:</label>
          <input id="description" name="description" className="edit-activity-input" placeholder="Description" value={form.description} onChange={handleChange} />
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="profesor_name">Professor Name:</label>
          <input id="profesor_name" name="profesor_name" className="edit-activity-input" placeholder="Professor Name" value={form.profesor_name} onChange={handleChange} />
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="quotas">Quotas:</label>
          <input id="quotas" name="quotas" type="number" className="edit-activity-input" placeholder="Quotas" value={form.quotas} onChange={handleChange} />
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="day">Day:</label>
          <select id="day" name="day" className="edit-activity-select" value={form.day} onChange={handleChange} required>
            <option value="" disabled>Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label">Hour Start:</label>
          <div className="edit-activity-hour-group">
            <input name="hour" type="text" placeholder="HH" value={hour} onChange={handleHourChange} maxLength={2} className="edit-activity-hour-input" />
            :
            <input name="minute" type="text" placeholder="MM" value={minute} onChange={handleHourChange} maxLength={2} className="edit-activity-hour-input" />
            :
            <input name="second" type="text" placeholder="SS" value={second} onChange={handleHourChange} maxLength={2} className="edit-activity-hour-input" />
          </div>
        </div>
        <div className="edit-activity-row">
          <label className="edit-activity-label" htmlFor="photo">Photo URL:</label>
          <input id="photo" name="photo" className="edit-activity-input" placeholder="Photo URL" value={form.photo} onChange={handleChange} />
        </div>
        <button type="submit" className="edit-activity-input" style={{ fontWeight: "bold", background: "#db4f0e", color: "#fff", cursor: "pointer" }}>
          Editar Actividad
        </button>
      </form>
    </div>
  );
};

export default EditActivity;
