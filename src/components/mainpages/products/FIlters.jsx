import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';



const FIlters = () => {
    const state=useContext(GlobalState) ;

  const [categories ]=state.categoryAPI.categories
    const[category,setCategory]=state.productsAPI.category;
    const[sort,setSort]=state.productsAPI.sort;
    const[search,setSearch]=state.productsAPI.search;


    const handleCategory =e=>{
        setCategory(e.target.value) ;
        setSearch('')
    }
    return (
        <div className="filter_menu">
            <div className="row">
                <span>
                    Filters:
                </span>
                <select name="categroy"   value={category} onChange={handleCategory}>

                    <option value=''> All Products </option>
                    {
                        categories.map(category=>(
                            <option value={"category=" + category._id } key={category._id}>
                                {
                                    category.name
                                }
                            </option>
                        ))
                    }

                </select>
            </div>


            <input type="text"  value={search} placeholder="Enter your search !"  
            onChange={e=> setSearch(e.target.value.toLocaleLowerCase())}/>



           <div className="row sort">
                <span>
                    Sort By:
                </span>
                <select name="categroy" value={sort}  onChange={e=> setSort(e.target.value)}>

                    <option value=''> Newest  </option>
                    <option value='sort=oldest'> Oldest</option>
                    <option value='sort=-sold'> Best Sales </option>
                    <option value='sort=-price'> Price : Hight-Low </option>
                    <option value='sort=price'>Low-Hight </option>
 

                </select>
            </div>
            
        </div>
    )
}

export default FIlters
