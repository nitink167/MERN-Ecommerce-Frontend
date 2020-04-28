import React, {useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated()

	const goBack = () => (
		<Link className='btn btn-md btn-dark mb-3' to='/admin/dashboard'>Admin Home</Link>
	)

	const handleChange = (event) => {
		setError('')
		setName(event.target.value)
	}

	const onSubmit = (event) => {
		event.preventDefault();
		setError('')
		setSuccess(false)
		//backend request
		createCategory(user._id, token, {name})
		.then(data => {
			if(data.error) {
				setError(true)
			} else {
				setError('')
				setSuccess(true)
				setName('')
				window.setTimeout(function () {
			        window.location.href = "/admin/dashboard";
			    }, 2000)
			}
		})
	}

	const successMessage = () => {
		if(success) {
			return <h5 className='text-success'>Category created successfully</h5>
		}
	}

	const errorMessage = () => {
		if(error) {
			return <h5 className='text-success'>Failed to create category</h5>
		}
	}

	const myCategoryForm = () => (
		<form>
			<div className='form-group'>
				<p className='lead'>Enter the Category</p>
				<input type='text' className='form-control my-3' onChange={handleChange} value={name} autoFocus required placeholder='For Example. Summer' />
				<button className='btn btn-outline-success' onClick={onSubmit}>Create Category</button>
			</div>
		</form>
	)

	return(
		<Base title='Create a Category' description='Add a new Category' className='container bg-success p-4'>
			{goBack()}
			<div className='row bg-white rounded'>
				<div className='col-md-8 offset-md-2'>
					{successMessage()}
					{errorMessage()}
					{myCategoryForm()}
				</div>
			</div>
		</Base>
	)
}

export default AddCategory;
