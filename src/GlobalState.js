import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import CategoryAPI from './api/CategoryAPI';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
export const GlobalState=createContext();


export const DataProvider =({children})=>{
    // ProductsAPI()


   const [token,setToken] = useState(false)

   useEffect(()=>{
       const firstLogin = localStorage.getItem("firstLogin") ;
       
        if(firstLogin){
            const refreshToken = async ()=>{
                const res= await axios.get("user/refresh_token")
         
                setToken(res.data.accesstoken) ;
        
                setTimeout(()=> {
                    refreshToken()
                     
                },10 * 60 * 1000)
                 
            }
          
             refreshToken()
        }

    
   },[])
     

    const state={
        token:[token,setToken],
        productsAPI:ProductsAPI(),
        userAPI:UserAPI(token),
        categoryAPI:CategoryAPI()
    }
    return (
        <GlobalState.Provider value={ state }> 
            {children}
        </GlobalState.Provider>
    )
}
