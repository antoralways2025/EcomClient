import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utilis/loading/Loading';
import ProductItem from '../utilis/ProductItem/ProductItem';
import FIlters from './FIlters';
import LoadMore from './LoadMore';



const Products = () => {

    const state = useContext(GlobalState)

    const [products,setProducts] = state.productsAPI.products
    const [isAdmin]=state.userAPI.isAdmin
    const [token]=state.token
    const [callback,setCallback]=state.productsAPI.callback ;
    const [loading,setLoading]=useState(false)
     
    const [isCheck,setIsCheck]=useState(false)

    const handleCheck =(id)=>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })

        setProducts([...products])
    }

    const deleteProduct=async(id,public_id)=>{
        
        try {
            setLoading(true)
            const destroyImg=await axios.post('/api/destroy',{public_id},{
                headers:{Authorization:token}
            })
            const deleteProduct=await axios.delete(`/api/products/${id}`,{
                headers:{Authorization:token}
            })

            await destroyImg
            await deleteProduct
            setLoading(false)
            setCallback(!callback) ;
            
        } catch (error) {
            alert(error.response.data.msg)
        }

    }

    const checkAll =()=>{
        products.forEach(product=>{
            product.checked= !isCheck
        })
        setProducts([...products]) ;
        setIsCheck(!isCheck)
    }

     const deleteAll=()=>{
         products.forEach(product=>{
             if(product.checked) deleteProduct(product._id,product.images.public_id)
         })
     }


    if(loading) return <div> < Loading /> </div>
    return (
        <>
             <FIlters/>
        {
            isAdmin&&  <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete All </button>
            </div>
        }
        <div className='products'>
       
             {
                products.map(product=>{
                  return  <ProductItem key={product._id} product={product}  handleCheck={handleCheck}  deleteProduct={deleteProduct}
                   
                   isAdmin={isAdmin}    />
                 })
             }
            
        </div>
        <LoadMore />
            {products.length === 0 && <Loading />}

         </>
    )
}

export default Products
