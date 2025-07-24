import React, { useState } from 'react'
import "./Register.css"
import { RegisterApi } from '../Services/Api';
import { storageUserDate } from '../Services/Storage';
import { isAuthenticated } from '../Services/Athu';
import { Link, Navigate } from 'react-router-dom';
import NavigationBar from './Navbar';
const Register = () => {

    const initialStateErrors = {name:{required:false},
                                email:{required:false},
                                password:{required:false},
                                custom_message:null}

    const [errors,setError] = useState(initialStateErrors);

    const [inputs,setInputs] = useState({
        name:'',
        email:'',
        password:''
    });
    const inputhandle =(event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }
    const handleSubmit =(event)=>{
        event.preventDefault();

        let errors = initialStateErrors
        let haserror = false;
        if (inputs.name=="") {
            errors.name.required = true;
            haserror = true
        }
        if (inputs.email=="") {
            errors.email.required = true;
            haserror = true
        }
        if (inputs.password=="") {
            errors.password.required = true;
            haserror = true
        }
        if(haserror != true){
            setLoading(true)
            //send API request
            RegisterApi(inputs)
            .then((response)=>{
                storageUserDate(response.data.idToken)
                
            })
            .catch((err)=>{
                if(err.response.data.error.message == "EMAIL_EXISTS"){
                    setError({...errors,custom_message:"Already have gmail"})
                }
                else if (String(err.response.data.error.message).includes("WEAK_PASSWORD")) {
                    setError({...errors,custom_message:"password have 6 character"})
                }
                console.log(err);
                
                
            })
            .finally(()=>{
                setLoading(false)
            })
        }
        setError({...errors})
        
    }
    const [loading,setLoading] = useState(false);

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to={"/dashboard"}/>
        
    }
    
   
    

  return (
  <div>
    <NavigationBar/>
     <form action="" onSubmit={handleSubmit}>
     <div className="container">
        <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div><div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0    A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <input type="text" placeholder='Enter the name' name='name' onChange={inputhandle}/>
            </div>
            {errors.name.required==true?<div className='errormessage'><span>Name is required</span></div>:null}
            </div>
            <div>
                <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
                <input type="email" placeholder='Enter the email' name='email' onChange={inputhandle}/>
            </div>
            {errors.email.required==true?<div className='errormessage'><span>Email is required</span></div>:null}
            </div>
            <div>
                <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                    </svg>
                </svg>
                <input type="password" placeholder='Enter the password' name='password' onChange={inputhandle}/>
                </div>
                {errors.password.required==true?<div className='errormessage'><span>password is required</span></div>:null}
            </div>
            <div>
                {errors.custom_message?<div className='errormessage'>{errors.custom_message}</div>:null}
            </div>
        </div>
        <div className='oneline'>
            <div className="already-have-account">
                Already have account? Please <Link to="/Login">Login</Link>
            </div>     
            {loading==true?<div className="spinner-container">
                <div className="spinner"></div>
            </div>:null}
        </div>

           
        <div className="submit-container">
            <button type='submit' className="submit" disabled={loading===true}>Sigin Up</button>
        </div>
    </div>
   </form>
  </div>
    
  )
}

export default Register