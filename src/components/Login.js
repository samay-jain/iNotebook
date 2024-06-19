import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();


    const handleSubmit = async(e) =>{
        //prevent default to prevent reloading of page
        e.preventDefault();

        //API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);

          if(json.success)
          {
            //save auth token and redirect to home page
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in successfully", "success");

          }
          else
            props.showAlert("Invalid details", "danger");
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={credentials.email} onChange={onChange} className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="exampleInputPassword1"/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
