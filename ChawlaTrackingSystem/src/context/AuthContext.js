import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext=createContext();
const AuthProvider = ({children}) => {
    const [userInfo,setUserInfo]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const register=(name,email,password)=>{
        setIsLoading(true);
        axios.post(`${BASE_URL}/register`,{
            name,email,password
        }).then(res=>{
            let userInfo=res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
        }).catch((err)=>{
            console.log(`Login Error: ${err}`);
            setIsLoading(false);
        })
    }
    const login=(email,password)=>{
        setIsLoading(true);
        axios.post(`${BASE_URL}/login`,{email,password}).then((res)=>{
            let userInfo=res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
        })
    }
    const logout=()=>{
        setIsLoading(true);
        axios.post(`${BASE_URL}/logout`,{},{
            headers:{Authorization:`Bearer ${userInfo.access_token}`}
        }).then(res=>{
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false)
        }).catch((err)=>{
            setIsLoading(false)
        })
    }
    const isLoggedIn=()=>{
        try {
            let userInfo=JSON.parse(AsyncStorage.getItem('userInfo'));
            if(userInfo){
                setUserInfo(userInfo);
            }
        } catch (error) {
            console.log(`is logged in error: ${error}`)
        }
    }
    useEffect(()=>{isLoggedIn()},[])
  return (
    <AuthContext.Provider value={{isLoading,userInfo,register,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

const styles = StyleSheet.create({})