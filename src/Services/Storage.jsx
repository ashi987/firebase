
export const storageUserDate=(data)=>{
    localStorage.setItem('idToken',data)
}

export const getUserData=()=>{
    return localStorage.getItem('idToken')
    
}

export const removeUser=()=>{
    return localStorage.removeItem('idToken')
}