import React from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth/helper/index';

const AdminDashboard = () => {

	const {user: {name, email, role, _id}} = isAuthenticated();

	const adminLeftSide = () => {
		return (
			<div className='card'>
				<h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
				<ul className='list-group'>
					<li className='list-group-item'>
						<Link className='nav-link text-success' to='/admin/create/category' >Create Categories</Link>
						<Link className='nav-link text-success' to='/admin/categories' >Manage Categories</Link>
						<Link className='nav-link text-success' to='/admin/create/product' >Create Products</Link>
						<Link className='nav-link text-success' to='/admin/products' >Manage Products</Link>
						<Link className='nav-link text-success' to='/admin/orders' >Manage Orders</Link>
					</li>
				</ul>
			</div>
		)
	}

	const adminRightSide = () => {
		return (
			<div className='card mb-4'>
				<h4 className='card-header'>Admin Info</h4>
				<ul className='list-group'>
					<li className='list-group-item'>
						<p><span className='badge badge-success mr-2'>Name:</span> {name}</p>
					</li>
					<li className='list-group-item'>
						<p><span className='badge badge-success mr-2'>Name:</span> {email}</p>
					</li>
					<li className='list-group-item'>
						<span className='badge badge-danger'>Admin Area</span>
					</li>
				</ul>
			</div>
		)
	}

	return (
		<Base title='Admin Dashboard Page' description='Manage all your products here' className='container bg-success p-4'>
			<div className='row'>
				<div className='col-3'>
					{adminLeftSide()}
				</div>
				<div className='col-9'>
					{adminRightSide()}
				</div>
			</div>
		</Base>
	)
}

export default AdminDashboard;
