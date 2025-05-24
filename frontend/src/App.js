import './style_app.css';
import Activities from './activities';
import Login from './login';
import Activity from './activity';
import MyActivities from './MyActivities';
import Inscription from './inscription';
import MyActivity from './myactivity'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<Activity />} />
        <Route path="/users/:id/activities" element={<MyActivities />} />
        <Route path="/users/inscription/:id" element={<Inscription />} />
        <Route path="/activities/:id" element={<MyActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
