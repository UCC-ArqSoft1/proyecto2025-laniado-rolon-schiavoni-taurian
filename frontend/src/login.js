import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";



// Nuestra vista de Login. 
// Tiene un input para el usuario y otro para la contraseña
// Para enviar esa info hago un post a local host  con esos datos
//si la llamada funciona bien, almaceno el token que viene en data.token en una cookie llamada data.token

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");


        //POST PARA ENVIAR LOS DATOS INGRESADOS EN EL INPUT
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error("Login failed");

            //Almacenar Token en una cookie
            const data = await response.json();
            document.cookie = `token=${data.token}; path=/; SameSite=Strict`;
            localStorage.setItem("userID", data.user_id);

            navigate("/activities");
            // navigate("/activities") para redirigir al usuario a la página de 
            // actividades después de hacer login correctamente. Funcion React Router (useNavigate) 
        } catch {
            setError("Credenciales incorrectas");
        }
    };

    //INPUT PARA EL USUARIO Y PARA LA CONTRASEÑA

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                {error && <div className="error"></div>}
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Entrar</button>

            </form>
        </div>

    );
};


export default Login;