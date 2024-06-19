import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        //prevent default to prevent reloading of page
        e.preventDefault();
        const {name, email, password} = credentials;

        //API Call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json);

          if(json.success)
          {
            //save auth token and redirect to home page
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
          }
          else
          props.showAlert("Invalid Credentials", "danger");
        }


    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


  return (
    <div className='container my-2'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" onChange={onChange} className="form-control" name='name' id="name" aria-describedby="nameHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" onChange={onChange} className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={onChange} className="form-control" name='password' id="password" minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" onChange={onChange} className="form-control" name='cpassword' id="cpassword" minLength={5} required/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
