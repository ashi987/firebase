
import React, { useEffect, useState } from 'react'
import { UserDetailsApi } from '../Services/Api'
import NavigationBar from './Navbar'
import { isAuthenticated, logout } from '../Services/Athu'
import { Navigate, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();

    const [user,setuser] = useState({name:"",email:"",localid:""})
    useEffect(()=>{
       if(isAuthenticated()){
         UserDetailsApi()
        .then((response)=>{
            setuser({name:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                    localid:response.data.users[0].localId}
            )
            
        })
        .catch((error)=>{
            console.log("Error fetching user details:", error)
        })
       }
        
    },[])
    const LogoutUser=()=>{
        logout()
        navigate('/Login')
    }
    if(!isAuthenticated){
        return <Navigate to="/Login"/>
    }
    
  return (
    <div>
        <NavigationBar LogoutUser={LogoutUser}/>
        <div className='container mt-5'>
        <div className='text-center mt-5'>
            <h3>Dashboard</h3>
            {user.name && user.email && user.localid ?
            (<div className='mt-5'>
                <p>name:{user.name}</p>
                <p>Gmail:{user.email}</p>
                <p>Firebase ID : {user.localid}</p>
            </div>):"Loading..."
            }
        </div>
    </div>
    </div>
  )
}

export default Dashboard