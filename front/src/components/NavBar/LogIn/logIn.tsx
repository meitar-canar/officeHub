import React, { useState } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { userLogin } from '../types/types';
import './logIn.css';

export default function LogIn() {
    const navigate = useNavigate();
    const navigateToNewPage = (pagePath: To) => {
        navigate(pagePath);
    };

    const [logInData, setLogInData] = useState<userLogin>({
        userName: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // Validation
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        if (logInData.userName.length < 2 || logInData.userName.length > 15) {
            newErrors.userName = 'The user name must contain between 2-15 characters';
            isValid = false;
        }

        const password = /^(?=.*[a-z])(?=.*\d).{8,}$/;
        if (!password.test(logInData.password)) {
            newErrors.password = 'The password must contain at least one lowercase letter, one number, and be at least 8 characters long.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        fetch('http://localhost:3001/signIn', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logInData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Login failed:', response.statusText);
                    return null;
                }
            })
            .then((responseAsOBJ) => {
                console.log(responseAsOBJ); // Log the full response object
                if (responseAsOBJ && responseAsOBJ.token) { // Adjust the property name accordingly
                    localStorage.setItem('token', responseAsOBJ.token);
                    console.log('Token stored in localStorage:', responseAsOBJ.token);
                    setSuccessMessage('Login has been successfully approved.');
                    setTimeout(() => {
                        navigateToNewPage('/profile-page');
                    }, 3000); // Wait for 2 seconds before navigating to profile page
                } else {
                    console.error('Unexpected login response');
                    navigateToNewPage('/signUp');
                }
            })
            .catch((error) => {
                console.error('Error while submitting form', error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogInData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="mainContainers">
            <form>
                <div className='secondContainers'>
                    <h1>Login</h1>
                    <label htmlFor="userName" className="labels">
                        User Name
                    </label>
                    <input
                        id="userName"
                        className="inputs"
                        name="userName"
                        type="text"
                        value={logInData.userName}
                        onChange={handleChange}
                        required
                    />
                    {errors.userName && <p className="errorMessage">{errors.userName}</p>}

                    <br />
                    <label htmlFor="password" className="labels">
                        Password
                    </label>
                    <input
                        id="password"
                        className="inputs"
                        name="password"
                        type="password"
                        value={logInData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="errorMessage">{errors.password}</p>}

                    <button type="submit" id="submitBtn" onClick={(e) => { handleSubmit(e) }}>
                        Login
                    </button>
                    <button type="submit" onClick={() => navigateToNewPage('/signUp')}>
                        Dont have a user? SignUp
                    </button>
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                </div>
            </form>
        </div>
    );
};