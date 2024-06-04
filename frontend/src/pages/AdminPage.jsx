import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [marketers, setMarketers] = useState([])

    const handleLogin = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === 'password') {
            setLoggedIn(true)
        } else {
            alert('Incorrect username or password')
        }
    }

    useEffect(() => {
        if (loggedIn) {
            axios.get('http://localhost:5000/api/marketers')
                .then(response => {
                    setMarketers(response.data)
                })
                .catch(error => {
                    console.error('There was an error fetching the marketers!', error)
                })
        }
    }, [loggedIn])

    return (
        <div className={`admin-page ${loggedIn ? 'logged-in' : ''}`}>
            <div className="admin-container">
                {loggedIn ? (
                    <div className="submitted-marketers">
                        <h2>Submitted Marketers</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Website</th>
                                    <th>LinkedIn</th>
                                    <th>Experience</th>
                                    <th>Budget</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marketers.map(marketer => (
                                    <tr key={marketer._id}>
                                        <td>{marketer.firstName}</td>
                                        <td>{marketer.lastName}</td>
                                        <td>{marketer.email}</td>
                                        <td>{marketer.website}</td>
                                        <td>{marketer.linkedin}</td>
                                        <td>{marketer.experience}</td>
                                        <td>{marketer.budget}</td>
                                        <td>{new Date(marketer.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </div>
    )
}