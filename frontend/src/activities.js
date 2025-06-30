import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style_activities.css";

function IsAdmin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const token = document.cookie

    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  fetch(`http://localhost:8080/users/admin`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
    },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsAdmin(true);
      }
    })
    .catch((err) => {
      console.error("Error checking admin status:", err);
      return false;
    });

  if (!isAdmin) {
    return null;
  }
  return (
    <div>
      <button className="admin-view" onClick={() => navigate("/users/admin")}>
        Admin View
      </button>
    </div>
  );
}

function SaludoUsuario() {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("surname");
  return (
    <div>
      <h2 className="user-welcome">
        Hello {userName} {userSurname}!
      </h2>
    </div>
  );
}

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [searchKey, setSearchKey] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const handleSearch = (e) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    e.preventDefault();
    if (searchKey && searchValue) {
      fetch(
        `http://localhost:8080/activities?${searchKey}=${encodeURIComponent(
          searchValue
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch((err) => console.error("Error fetching activities:", err));
    } else if (searchKey === "all") {
      fetch("http://localhost:8080/activities", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
        },
      })
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch((err) => console.error("Error fetching activities:", err));
    }
    setSearchValue("");
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/activities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Este fragmento establece una cabecera HTTP
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("You are not authenticated. Please log in.");
          navigate("/login");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => setActivities(data))
      .catch((err) => console.error("Error fetching activities:", err));
  }, [navigate]);

  return (
    <div>
      <button
        className="my-activities-btn"
        onClick={() => navigate(`/users/activities`)}
      >
        My Activities
      </button>
      <header className="header"></header>
      <form className="search-navbar" onSubmit={handleSearch}>
        <select
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
            if (e.target.value === "all") setSearchValue("");
          }}
          className="search-select"
          required
        >
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="professor_name">Professor</option>
          <option value="day">Day</option>
          <option value="hour_start">Hour Start</option>
          <option value="description">Description</option>
        </select>
        <input
          type="text"
          value={searchValue}
          placeholder={searchKey === "all" ? "" : "Enter value"}
          disabled={searchKey === "all"}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="container">
        <SaludoUsuario />
        <IsAdmin />
        <div className="row row-cols-1 row-cols-2 row-cols-3 g-6">
          {activities &&
            activities.length > 0 &&
            activities.map((activity) => (
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
