import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryAPI = () => {
    const [categories,setCategories]=useState([]) ;
    const[callback,setCallback]=useState(false)

    useEffect(()=>{
        const getCategories = async()=>{
            const res=await axios.get('/api/category') ;
            setCategories(res.data)
        }

        getCategories()
    },[callback])

    
    return{
        categories:[categories , setCategories],
        callback: [callback , setCallback]
    }
}

export default CategoryAPI
