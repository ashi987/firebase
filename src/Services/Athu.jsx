import { getUserData, removeUser } from "./Storage"

export const isAuthenticated=()=>{
    return getUserData()!=null?true:false;
}

export const logout=()=>{
    removeUser()
}