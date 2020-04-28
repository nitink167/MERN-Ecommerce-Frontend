import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getSingleCategory, updateCategory } from './helper/adminapicall';

import { isAuthenticated } from '../auth/helper/index'

const UpdateCategory = ({ match }) => {

	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const preLoad = (categoryId) => {
        getSingleCategory(categoryId)
        .then(data => {
            if(data.error) {
				setError(data.error)
            } else {
				setName(data.name)
            }
        })
    }

    useEffect(() => {
        preLoad(match.params.categoryId)
    }, [])

    const handleChange = name => event => {
		setError('')
		setName(event.target.value)
    };

	const onSubmit = (event) => {
		event.preventDefault();
		setError('')
		setSuccess(false)
		//backend request
		updateCategory(match.params.categoryId, user._id, token, {name})
		.then(data => {
			if(data.error) {
				setError(true)
				console.log(data.error)
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
        return (
            <div className='alert alert-success mt-3' style={{ display: success ? '' : 'none'}}>
                <h5>Category updated successfully</h5>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className='alert alert-danger mt-3' style={{ display: error ? '' : 'none'}}>
                <h5>{error}</h5>
            </div>
        )
    }

    const updateCategoryForm = () => (
        <form>
            <span>Update Category</span>
            <div className="form-group">
                <input onChange={handleChange("name")} name="name" className="form-control" placeholder="Name" value={name} />
            </div>
            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Category
            </button>
        </form>
  );

    return (
        <Base title="Add a product here!" description="Welcome to product creation section" className="container bg-success p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                    {updateCategoryForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
