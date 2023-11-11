import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
   
    const [credentials,setCredentials] = useState({name:"", email:"",password:"" ,cpassword:""});
    const navigate= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"  
            },
            body: JSON.stringify({name:credentials.name, email :credentials.email,password :credentials.password})
          });
        
        const json= await response.json();
        
        console.log(json)

        if(json.success){
//save the auth token and redirect
localStorage.setItem('token',json.authtoken);
navigate('/')
        }
        else{
          alert("Incorrect Credentials")
          setCredentials({name:"", email:"",password:"" ,cpassword:""})
        }
    }

    const onChange=(e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
       }

  return (
    
    <div style={{marginTop:"70px"}} className='container'>
        <h2 style={{marginLeft:"33%"}} >Create Account</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
        <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup