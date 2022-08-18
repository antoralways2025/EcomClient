import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utilis/loading/Loading';
const initialState={
    product_id:'' ,
    title:'',
    price:0,
    description:'How to add tutorial videos of cool css effect, web Design ideas , Javascript libraries, Node.js',
    content:"Welcome to our channel Dev AT . Here you can learn web designing, UI?UX designing, htlml css tutorials ,css animation",
    category:'',
    _id:''
}
const CreateProduct = () => {

    const state=useContext(GlobalState) ;
    const [product,setProduct]=useState(initialState) ;
    const [categories]=state.categoryAPI.categories ;
    const [images,setImages]=useState(false) ;
    const [loading,setLoading]=useState(false)

 const [isAdmin]=state.userAPI.isAdmin ;
 const [token]=state.token ;

 const history=useHistory() ;
 const param=useParams()

const [products]=state.productsAPI.products ;
const [onEdit,setOnEdit]=useState(false)
const[callback,setCallback]=state.productsAPI.callback ;
 useEffect(()=>{
     if(param.id){
        setOnEdit(true)
        products.forEach(product=>{
            if(product._id === param.id){
                setProduct(product) ;
                setImages(product.images)
            }
        })
     }else{
        setOnEdit(false)
        setProduct(initialState) ;
        setImages(false)
   }
 },[param.id,products])




    const handleUpload=async e=>{
        e.preventDefault() ;
        try {
            if( !isAdmin) return alert("You're  not an admin") ;
            const file =e.target.files[0]
            if(!file) return alert(" File not exist") ;
            if(file.size > 1024 * 1024) //1mb 
            return alert('Size too large !') ;
            if(file.type !== "image/jpeg" && file.type !== "image/png")
            return alert("File formate is inccorect !")

            let formData=new FormData() ;
            formData.append('file',file) 
            setLoading(true) ;
            const res=await axios.post('/api/upload',formData,{
                headers:{'Content-type':'multipart/form-data', Authorization:token}

            })
            setLoading(false)
             setImages(res.data)
         } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleDestroy=async()=>{
        try{
            if(!isAdmin) return alert("You're not admin..") ;
            setLoading(true)
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}

            })
            setLoading(false)
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }


    const handleChangInput=e=> {
        const {name,value}=e.target;
        setProduct({...product,[name]:value})
    }


 const handleSubmit= async e=>{
     e.preventDefault()
     try {
         if(!isAdmin)return alert("You're not an admin")
         if(!images)return alert("No Image Upload") ;

         if(onEdit){
            await axios.put(`/api/products/${product._id}`,{...product,images},{
                headers:{Authorization:token}
            })
         }else{
            await axios.post("/api/products",{...product,images},{
                headers:{Authorization:token}
            })
         }
        //  setImages(false) ;
        //  setProduct(initialState) ;
         setCallback(!callback)
    
         
         history.push('/')
         
     } catch (error) {
         alert(error.response.data.msg)
     }
 }


    const styleUploads={
        display:  images ? "block":"none"
    }

    return (
        <div className='create_product'>
              <div className="upload">
                  <input type="file" name='file' id='file_up' onChange={handleUpload}  />

                  {
                    loading ?   <div id="file_img" >
                                    <Loading />
                                </div> 
                         :
                                <div id="file_img" style={styleUploads}>
                                <img src={images ? images.ulr : ''} alt=" " />
                                <span onClick={handleDestroy}>X</span>  
                                </div>
                  }
 
              </div>

              <form  onSubmit={handleSubmit} >
                  <div className="row">
                      <label htmlFor="product_id">Product ID</label> 
                      <input type="text" name='product_id' id="product_id" required  value={product.product_id} 
                      onChange={handleChangInput}  disabled={onEdit} />
                  </div>
                  <div className="row">
                      <label htmlFor="title">Title</label> 
                      <input type="text" name='title' id="title" required  value={product.title}  onChange={handleChangInput} />
                  </div>
                  <div className="row">
                      <label htmlFor="price"> Price</label> 
                      <input type="number" name='price' id="price" required  value={product.price} onChange={handleChangInput}  />
                  </div>

                  <div className="row">
                      <label htmlFor="description">Description</label> 
                      <textarea  type="text" name='description' id="description" required 
                       value={product.description}  rows="5"  onChange={handleChangInput}/>
                  </div>
                  <div className="row">
                      <label htmlFor="content">Content</label> 
                      <textarea type="text" name='content' id="content" required 
                       value={product.content} rows="5"  onChange={handleChangInput}/>
                  </div>

                  <div className="row">
                      <label htmlFor="categories"> Categories: </label> 

                       <select name="category"  value={product.category} onChange={handleChangInput}>
                           <option value="">Please Select a category </option>

                           {
                               categories.map(category=>(
                                   <option value={category._id} key={category._id}> 
                                    { category.name}
                                   </option>
                               ))
                           }
                       </select>
 
                  </div>


                  <button type="submit">{onEdit ? "Update": "Create"} </button>
              </form>
        </div>
    )
}



 
export default CreateProduct
