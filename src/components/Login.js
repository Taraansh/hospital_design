import React, { useState } from 'react';
import Home from './Home';
// import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataValid, setIsDataValid] = useState();

const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:8000/patient/loginreq/${email}/${password}/`;
    // const data = await fetch(url)
    // const parsedData = await data.json()
    // console.log(parsedData)
    // if (JSON.stringify(parsedData) === JSON.stringify({"status": "success"}))
    // {
    //     setIsDataValid(true);
    // }
    // else
    // {
    //     setIsDataValid(false);
    // }
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        setIsDataValid(true);
      } 
      else {
        setIsDataValid(false);
        window.alert("Enter correct credentials");
      }
    } catch (error) {
      console.error(error);
      setIsDataValid(false);
    }
  };


if (isDataValid) {
  return <Home />;
}

  return (
    <div className='container'>
        <div className="card mx-auto position-absolute top-50 start-50 translate-middle" style={{width: '18rem', padding: '35px 20px'}}>
            <h5 className="card-title">Login</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" id="exampleInputPassword1" autoComplete="current-password"/>
                    </div>  
                    <button type="submit" className="btn btn-dark d-grid gap-2 col-12 mx-auto"  style={{marginTop: '30px'}}>Login</button>
                </form>  
            </div>
            <div id="newEmailSetUp" className="form-text mx-3">Need an accout? <a href="/">Sign up</a> </div>
        </div>
    </div>
  )
}
