import React, { useState } from 'react'
import './contactUs.css';
import { IContact } from '../types/types';
import { Link, To, useNavigate } from 'react-router-dom';


export default function ContactUs() {

    const navigate = useNavigate();
    const navigateToNewPage = (pagePath: To) => {
        navigate(pagePath);
    };

    const [formData, setFormData] = useState<IContact>({
        userName: '',
        email: '',
        requestDetails: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        // Check if requestDetails name is at least 0 characters long
        if (formData.requestDetails.length < 0 || formData.requestDetails.length > 255) {
            newErrors.requestDetails = 'The first name must contain between 2-20 characters';
            isValid = false;
        }


        if (formData.userName.length < 2 || formData.userName.length > 15) {
            newErrors.userName = 'The user name must contain between 2-15 characters';
            isValid = false;
        }

        const email = /^[\w-]+(\.[\w-]+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!email.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!isValid) {
            // If there are validation errors, set the errors state
            setErrors(newErrors);
            return;
        }

        // If form is valid, submit data
        fetch('http://localhost:3001/request', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log(response);
                // Reset form data after successful submission if needed
                setFormData({
                    userName: '',
                    email: '',
                    requestDetails: ''

                });
            })
            .catch((error) => {
                console.error('Error while submitting form', error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };



    return (
        <div className="mainContactUs">
            <form onSubmit={handleSubmit}>
                <div className='secondContainer'>
                    <div className='inputsDiv'>
                        <h1>Get in touch</h1>
                        <h5> Complete the form and a OfficeHub team member <br /> will be in touch with you shortly.</h5>
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
                            your email
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


                        <label htmlFor="requestDetails" className="labels">
                        </label>
                        <input
                            placeholder='Type your message here'
                            id="requestDetails"
                            className="inputsMessage"
                            name="requestDetails"
                            type="text"
                            value={formData.requestDetails}
                            onChange={handleChange}
                            required
                        />
                        {errors.requestDetails && <p className="errorMessage">{errors.requestDetails}</p>}

                        <h6>By clicking the submit below, you agree to the <Link to="/TermsOfService">Terms of Service</Link></h6>

                        <button type="submit" id="submitBtn">Submit</button>
                    </div>
                    <hr />
                    <div className='hDiv'>
                        <h1>Workspace by the day or hour</h1>
                        <h5>Book hot desks and private offices by the day and meeting rooms by the hour with<Link to="/rooms"> Rooms.</Link></h5>
                        <br />
                        <br />
                        <h1>Call us</h1>
                        <h5>Questions about plans, pricing, or availability? 072-555-5555</h5>
                    </div>
                </div>
            </form>

        </div>

    );
};
