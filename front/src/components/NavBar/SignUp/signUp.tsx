import React, { useState } from 'react';
import { INewUser } from '../types/types';
import { To, useNavigate } from 'react-router-dom';
import './signUp.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<INewUser>({
        userName: '',
        password: '',
        email: '',
        uroleId: 3,
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        if (formData.firstName.length < 2 || formData.firstName.length > 20) {
            newErrors.firstName = 'The first name must contain between 2-20 characters';
            isValid = false;
        }

        if (formData.lastName.length < 2 || formData.lastName.length > 20) {
            newErrors.lastName = 'The last name must contain between 2-20 characters';
            isValid = false;
        }

        if (formData.address.length < 2 || formData.address.length > 20) {
            newErrors.address = 'The address name must contain between 2-20 characters';
            isValid = false;
        }

        if (formData.phone.length !== 10 || isNaN(Number(formData.phone))) {
            newErrors.phone = 'The phone number must contain 10 digits and be numbers only';
            isValid = false;
        }

        if (formData.userName.length < 2 || formData.userName.length > 15) {
            newErrors.userName = 'The user name must contain between 2-15 characters';
            isValid = false;
        }

        const email = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-_]+\.)*[a-zA-Z]{2,}$/;
        if (!email.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        const password = /^(?=.*[a-z])(?=.*\d).{8,}$/;
        if (!password.test(formData.password)) {
            newErrors.password = 'The password must contain at least one lowercase letter, one number, and be at least 8 characters long.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // If form is valid, submit data
        fetch('http://localhost:3001/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log(response);
                setShowSuccessMessage(true);
                setFormData({
                    userName: '',
                    password: '',
                    email: '',
                    uroleId: 3,
                    firstName: '',
                    lastName: '',
                    address: '',
                    phone: ''
                });
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    navigate('/logIn');
                }, 4000); // Adjust the delay as needed
            })
            .catch((error) => {
                console.error('Error while submitting form', error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="mainSignUp">
            <form onSubmit={handleSubmit}>
                <div className='secondContainer'>
                    <div className='leftSide'>
                        <label htmlFor="firstName" className="labels">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            className="inputs"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        {errors.firstName && <p className="errorMessage">{errors.firstName}</p>}

                        <label htmlFor="lastName" className="labels">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            className="inputs"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        {errors.lastName && <p className="errorMessage">{errors.lastName}</p>}

                        <label htmlFor="address" className="labels">
                            Address
                        </label>
                        <input
                            id="address"
                            className="inputs"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        {errors.address && <p className="errorMessage">{errors.address}</p>}

                        <label htmlFor="phone" className="labels">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            className="inputs"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <p className="errorMessage">{errors.phone}</p>}
                    </div>

                    <div className='divider'></div>

                    <div className='rightSide'>
                        <label htmlFor="userName" className="labels">
                            User Name
                        </label>
                        <input
                            id="userName"
                            className="inputs"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                        {errors.userName && <p className="errorMessage">{errors.userName}</p>}

                        <label htmlFor="email" className="labels">
                            Email
                        </label>
                        <input
                            id="email"
                            className="inputs"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="errorMessage">{errors.email}</p>}

                        <label htmlFor="password" className="labels">
                            Password
                        </label>
                        <input
                            id="password"
                            className="inputs"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="errorMessage">{errors.password}</p>}
                        {showSuccessMessage && <div className="successMessage">You have successfully registered on the site</div>}
                        <button type="submit" id="submitBtn">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
