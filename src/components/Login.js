import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"  
            },
            body: JSON.stringify({email :credentials.email,password :credentials.password})
          });
        const json= await response.json();
        console.log(json)
        if(json.success){
//save the auth token and redirect
localStorage.setItem('token',json.authtoken);
navigate('/')
        }
        else{
          alert("Incorrect Credentials");
          setCredentials({email:"",password:""});
        }
    }

    const onChange=(e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
       }

  return (

   
    <div style={{marginTop:"70px"}} className='container '>
      <h2 >Login to continue</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
export default Login