import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style_activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [searchKey, setSearchKey] = useState(""); 
  const [searchValue, setSearchValue] = useState(""); 
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

    const handleSearch = (e) => {
    e.preventDefault();
    if (searchKey && searchValue) {
      fetch(`http://localhost:8080/activities?${searchKey}=${encodeURIComponent(searchValue)}`)
        .then(res => res.json())
        .then(data => setActivities(data))
        .catch(err => console.error("Error fetching activities:", err));
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/activities')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div>
      <button
        className="my-activities-btn"
        onClick={() => navigate(`/users/${userID}/activities`)}
      >
        My Activities
      </button>

    
      <header className="header">
        <h1>Actividades</h1>
        <p>Descubrí y participá de nuestras propuestas</p>
      </header>
      
      <form className="search-navbar" onSubmit={handleSearch}>
        <select
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
          className="search-select"
          required
        >
          <option value="">Filtrar</option>
          <option value="name">Nombre de la Actividad</option>
          <option value="category">Categoría de la Actividad</option>
          <option value="profesor_name">Profesor de la Actividad</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Ingrese valor"
          required
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>

      <div className="container">
        <div className="row row-cols-1 row-cols-2 row-cols-3 g-6">
          {activities.map((activity) => (
            <div className="col" key={activity.id}>
              <div className="card-activity">
                <img src="https://via.placeholder.com/450x300" alt="Actividad" />
                <div className="card-activity-body d-flex flex-column">
                  <h5 className="card-activity-title">{activity.name}</h5>
                  <p className="card-activity-text">{activity.description}</p>
                  <button
                    className="btn btn-outline-dark card-activity-btn mt-auto"
                    onClick={() => navigate(`/activities/${activity.id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
