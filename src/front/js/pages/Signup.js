import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);  // Estado para controlar la visibilidad de la contraseña
    const [errorMessage, setErrorMessage] = useState("");  // Para almacenar el mensaje de error
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            email,
            password,
        };
        const url = `${process.env.BACKEND_URL}/api/signup`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        };

        try {
            const response = await fetch(url, options);
            if (response.status === 409) {
                setErrorMessage("El usuario ya existe");
            } else if (!response.ok) {
                console.log('Error:', response.status, response.statusText);
                setErrorMessage("Ha ocurrido un error, intentalo de nuevo.");
            } else {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                actions.setIsLogin(true);
                actions.setCurrentUser(data.results);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card text-white" style={{ backgroundColor: "rgba(1, 6, 16, 0.000)" }}>
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3 display-5">Register</h2>
                            {errorMessage && <div className="alert alert-secondary" role="alert">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="email" className="mb-1">Email:</label>
                                    <input type="email" className="form-control" id="email"
                                        value={email} onChange={handleEmailChange} required />
                                </div>
                                <div className="form-group mt-3 h6 position-relative">
                                    <label htmlFor="password" className="mb-1">
                                        Password:
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}  // Cambiar tipo basado en showPassword
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="password-toggle-icon text-dark"
                                        style={{
                                            position: "absolute",
                                            right: "20px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPassword ? (
                                            <i className="fas fa-eye mt-4"></i>
                                        ) : (
                                            <i className="fas fa-eye-slash mt-4"></i>
                                        )}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-light ms-2 mt-4">Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
