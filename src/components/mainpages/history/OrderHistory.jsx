import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utilis/loading/Loading';


  const OrderHistory = () => {
    const state=useContext(GlobalState) ;
    const [history,setHistory]=state.userAPI.history ;
    const [isAdmin]=state.userAPI.isAdmin ;
    const [token]=state.token ;

    useEffect(()=>{
        if(token){
            const getHistory=async()=>{

                if(isAdmin){
                   const res = await axios.get('/api/payment',{
                       headers:{Authorization:token}
                   })
                   setHistory(res.data)
   
                }else{
                   const res = await axios.get(' /user/history ',{
                       headers:{Authorization:token}
                   })
                                     
                  setHistory(res.data) ;

                }
   
            }
   
            getHistory()
        }
    },[token,isAdmin,setHistory]) ;

    if(history.length === 0) return <Loading/>
 
    return (
        <div className="history_page">
               <h2>History</h2>

             <h4>You have {history.length} ordered </h4>
             <div >
                 <table>
                     <thead>
                         <tr>
                             <th> Payment ID</th>
                             <th>  Date of Purchased </th>
                             <th> </th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             history.map(items=>{
                                 return <tr key= {items._id} >
                                     <td>
                                        { items.paymentID}
                                     </td>
                                     <td>
                                       { new Date(items.createdAt).toLocaleDateString()}
                                     </td>
                                     <td>
                                         <Link to ={`/history/${ items._id}` } > View </Link>
                                     </td>
                                 </tr>
                             })
                         }
                     </tbody>
                 </table>
             </div>
        </div>
    )
}


export default OrderHistory