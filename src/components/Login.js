import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    let Navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();//to stop the page from reloading

        //API call
        const response = await fetch(`http://localhost:5000/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //Save the auth-token and rediect
            localStorage.setItem('token', json.authToken);
            Navigate("/");

        } else {
            alert("Invalid credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>

    )
}
export default Login