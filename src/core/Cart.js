import React, {useState, useEffect} from 'react';
import '../styles.css';
import {API} from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import PaymentB from './PaymentB'

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart())
	}, [reload])

	const loadAllProducts = () => {
		return (
			<div>
				<h2>Order</h2>
				{products.map((product, index) => {
					return <Card key={index} product={product} addToCart={false} removeFromCart={true} setReload={setReload} reload={reload} />
				})}
			</div>
		)
	}

	const loadCheckout = () => {
		return (
			<div>
				<h2>For Checkout</h2>
			</div>
		)
	}

	return (
		<Base title='Cart Page' description='Ready to checkout'>
			<div className='row text-center'>
				<div className='col-6'> { products.length > 0 ? loadAllProducts() : (<h3>No Products in cart</h3>)}  </div>
				<div className='col-6'>	<PaymentB products={products} setReload={setReload}/> </div>
			</div>
		</Base>
	)
}

export default Cart;
