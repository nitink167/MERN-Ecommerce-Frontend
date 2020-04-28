import React, {useState	} from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'


const Card = ({
	product,
	addToCart = true,
	removeFromCart = false,
	setReload = f => f,
	reload = undefined
}) => {

	const [redirect, setRedirect] = useState(false)
	const [count, setCount] = useState(product.count)

	const cardTitle = product ? product.name : 'A photo from pexels';
	const cardDescription = product ? product.description : 'DEFAULT';
	const cardPrice = product ? product.price : 'DEFAULT';

	const addThisToCart = () => {
		addItemToCart(product, () => {
			setRedirect(true)
		})
	}

	const getRedirect = (redirect) => {
		if(redirect) {
			return <Redirect to='/cart' />
		}
	}

	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button	onClick={addThisToCart} className="btn btn-block btn-outline-success mt-2 mb-2" >
					Add to Cart
				</button>
			)
		)
	}

	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button onClick={() => {
					removeItemFromCart(product._id)
					setReload(!reload)
				}} className="btn btn-block btn-outline-danger mt-2 mb-2" >
					Remove from cart
				</button>
			)
		)
	}

	return (
		<div className="card text-white bg-dark ">
    		<div className="card-header lead">
				{cardTitle}
				{getRedirect(redirect)}
			</div>
			<div className="card-body">
				<ImageHelper product={product}/>
  				<p className="lead bg-info font-weight-normal text-wrap mt-4 rounded py-3">
    				{cardDescription}
  				</p>
				<div className='row ml-0'>
  					<div className="btn col-4 btn-success rounded btn-sm mt-2 mb-2">Rs. {cardPrice}</div>
					{
						addToCart && (
							<div className="col-8">
								{showAddToCart(addToCart)}
							</div>
						)
					}
        			<div className="col-8">
          				{showRemoveFromCart(removeFromCart)}
        			</div>
				</div>
  			</div>
  		</div>
	);
}

export default Card;
