import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utilis/ProductItem/ProductItem'

const DetailProducts = () => {
    const params =useParams()
   const state=useContext(GlobalState) ;
   const [products]=state.productsAPI.products  ;
   const addCart = state.userAPI.addCart
   const [detailProduct,setDetailProduct] = useState([])

   useEffect(()=>{
    //    console.log('re render')
       if(params.id){
           products.forEach(product=>{
               if(product._id === params.id)return setDetailProduct(product)
           })
       }

   },[params.id,products])
  

 if(detailProduct.length === 0) return null
 
    return (
            < >

               <div className='detail'>
            <img src={detailProduct.images.ulr} alt="" />

            <div className="box-detail">

                <div className="row"> 

                        <h2>{detailProduct.title}</h2>
                        <h6>#id:{detailProduct.product_id}</h6>
                        
                        </div>

                        <span> ${detailProduct.price}</span>
                        <p>{detailProduct.description}</p>
                        <p>{detailProduct.content}</p> 
                        <p>Sold : {detailProduct.sold}</p>

                        <Link className='cart' to='/cart'onClick={()=> addCart(detailProduct) } > Buy Now</Link>
                

            </div>
        </div>

        <div>
            <h2>
                Related  Products
            </h2>

            <div className="products">
                {
                    products.map((product=>{
                        return product.category === detailProduct.category
                        ? <ProductItem key={product._id} product={product}/> : null
                    }))
                }
            </div>
        </div>


        </>
    )
}

export default DetailProducts
