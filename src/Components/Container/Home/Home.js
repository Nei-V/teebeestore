import React, { Component } from 'react';
import axios from 'axios'; //to call the backend
import './Home.css';

import Loader from '../../Presentational/Loader/Loader';
import ProductCard from '../../Presentational/ProductCard/ProductCard';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            //the initial state holds the empty products array and a loading boolean set to true
            products: [],
            //the loader will be set to false when we gat the data
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/products').then(res => {
            //to check why proxy doens't work ('/api/products)
            //each .then must have a catch to get the errors
            console.log('res.data products-------', res.data);
            this.setState({
                loading: false,
                products: res.data
            })

        }).catch(err => console.log("Read all products Error---------", err));
    }

    render() {

        const { products, loading } = this.state;
        if (!loading) {
            return (
                <div className="home container">
                    <div className="home-products container">
                        {console.log("products.length", products.length)}
                        {products.length ? products.map(product => <ProductCard key={product.id} {...product} />) : null}
                    </div>
                </div>
            )
        } else {
            return (<Loader />)
        }
    }
}

