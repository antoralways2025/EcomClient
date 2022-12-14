import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import DetailProducts from './detailProducts/DetailProducts'
import OrderDetails from './history/OrderDetails'
import OrderHistory from './history/OrderHistory'
import Products from './products/Products'
import NotFound from './utilis/not_found/NotFound'
 


const Pages = () => {

    const state = useContext(GlobalState) ;
    const [isLogged]=state.userAPI.isLogged
 
    const [isAdmin]=state.userAPI.isAdmin

    return (
        <Switch> 
            <Route path="/" exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProducts}/>
            <Route path="/login" exact component={isLogged ? NotFound : Login}/>
            <Route path="/register" exact component={ isLogged ? NotFound : Register}/>

            <Route path="/category" exact component={isAdmin ? Categories : NotFound}/>

            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound}/>
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound}/>

            <Route path="/history" exact component={ isLogged ? OrderHistory : NotFound}/>
            <Route path="/history/:id" exact component={ isLogged ? OrderDetails : NotFound}/>
            <Route path="/cart" exact component={Cart}/>

            <Route path="*"  exact component={NotFound}/>
        </Switch>
    )
}

export default Pages
