import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppHeader } from '../cmps/AppHeader'

export function HomePage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        linkedin: '',
        experience: '',
        budget: 1000
    })

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState('')
    const [marketersCount, setMarketersCount] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:5000/api/marketers/count')
            .then(response => {
                setMarketersCount(response.data.count)
            })
            .catch(error => {
                console.error('There was an error fetching the marketer count!', error)
            })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let validationErrors = {}
        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Please enter a valid email address.'
        }
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData)  // Log form data
            axios.post('http://localhost:5000/api/marketers', formData)
                .then(response => {
                    setSubmitted(true)
                    setMessage(response.data.message)
                    axios.get('http://localhost:5000/api/marketers/count')
                        .then(response => {
                            setMarketersCount(response.data.count)
                        })
                        .catch(error => {
                            console.error('There was an error fetching the marketer count!', error)
                        })
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.error('Server responded with an error:', error.response.data)
                        setMessage(error.response.data.message)
                    } else {
                        console.error('An error occurred:', error)
                        setMessage('An error occurred')
                    }
                })
        }
    }

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            website: '',
            linkedin: '',
            experience: '',
            budget: 1000
        })
        setErrors({})
        setMessage('')
        setSubmitted(false)
    }

    return (
        <section className='home-section'>
            <AppHeader />
            <h2>Welcome!! Fill out this form please.</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email (required):</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Website:</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>LinkedIn Profile:</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>How many years of experience do you have with Facebook Marketing?</label>
                        <select name="experience" value={formData.experience} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="no experience">No experience</option>
                            <option value="0-1 years">0-1 years</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="2 or more years">2 or more years</option>
                        </select>
                    </div>
                    <div>
                        <label>What was the biggest campaign budget you have managed in a single month? (Optional)</label>
                        <input
                            type="range"
                            name="budget"
                            min="1000"
                            max="500000"
                            value={formData.budget}
                            onChange={handleChange}
                        />
                        <span>{formData.budget}</span>
                    </div>
                    <div className='btns'>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleReset}>Reset Form</button>
                    </div>
                </form>
            ) : (
                <p>{message}</p>
            )}
            <p>{marketersCount} marketers have joined so far!</p>
        </section>
    )
}