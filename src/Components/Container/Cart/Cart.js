import React, { Component } from 'react'
import './Cart.css'
import ProductCard from '../../Presentational/ProductCard/ProductCard'

const sampleCartData = [
    {name: 'test1', description: 'Test Product 1', price:10, id:1},
    {name: 'test2', description: 'Test Product 2', price:20, id:2},
    {name: 'test3', description: 'Test Product 3', price:30, id:3},
    {name: 'test4', description: 'Test Product 4', price:40, id:4},
]

export default class Cart extends Component {


    render(){
        return(
            <div className="cart container">
                <div className="cart-info container">
                    <h2>Your cart!</h2>
                    <div>{sampleCartData.map(product => <ProductCard key={product.id} {...product} />)}></div>
                </div>
            </div>
        )
    }
}
