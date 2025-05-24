import './style_app.css';
import Activities from './activities';
import Login from './login';
import Activity from './activity';
import Inscription from './inscription';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<Activity />} />
        <Route path="/users/inscription/:id" element={<Inscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
