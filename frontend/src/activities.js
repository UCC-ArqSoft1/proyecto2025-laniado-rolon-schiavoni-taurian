import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style_activities.css";

function SaludoUsuario() {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("surname");
  return (
    <div>
      <h2 className="user-welcome">Hello {userName} {userSurname}!</h2>
    </div>
  );
}

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKey && searchValue) {
      fetch(
        `http://localhost:8080/activities?${searchKey}=${encodeURIComponent(
          searchValue
        )}`
      )
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch((err) => console.error("Error fetching activities:", err));
    } else if (searchKey === "all") {
      fetch("http://localhost:8080/activities")
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch((err) => console.error("Error fetching activities:", err));
    }
    setSearchValue("");
  };

  useEffect(() => {
    fetch("http://localhost:8080/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div>
      <button
        className="my-activities-btn"
        onClick={() => navigate(`/users/${userID}/activities`)}
      >
        My Activities
      </button>
      <header className="header"></header>
      <form className="search-navbar" onSubmit={handleSearch}>
        <select
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="search-select"
          required
        >
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="professor_name">Professor</option>
          <option value="schedules">Schedule</option>
          <option value="description">Description</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder={searchKey === "all" ? "" : "Enter value"}
          disabled={searchKey === "all"}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="container">
        <SaludoUsuario />
        <div className="row row-cols-1 row-cols-2 row-cols-3 g-6">
          {activities.map((activity) => (
            <div className="col" key={activity.id}>
              <div className="card-activity">
                <img src={activity.photo} alt="Actividad" />
                <div className="card-activity-body d-flex flex-column">
                  <h5 className="card-activity-title">{activity.name}</h5>
                  <p className="card-activity-text">{activity.description}</p>
                  <button
                    className="btn btn-outline-dark card-activity-btn mt-auto"
                    onClick={() => navigate(`/activities/${activity.id}`)}
                  >
                    View details
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
