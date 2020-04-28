import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, getSingleProduct, updateProduct } from './helper/adminapicall';

import { isAuthenticated } from '../auth/helper/index'

const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: '',
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getARedirect: false,
        formData: ""
    });

    const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getARedirect, formData } = values;

    const preLoad = (productId) => {
        getSingleProduct(productId)
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
				preloadCategories()
                console.log(data)
                setValues({
                    ...values,
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category._id,
					stock: data.stock,
					formData: new FormData(),
                })
            }
        })
    }

	const preloadCategories = () => {
		getAllCategories()
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    categories: data,
					formData: new FormData(),
                })
            }
        })
	}

    useEffect(() => {
        preLoad(match.params.productId)
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({
            ...values,
            [name]: value
        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: '',
            loading: true
        })
        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    photo: '',
                    stock: '',
                    quantity: '',
                    loading: false,
                    formData: new FormData(),
                    error: '',
                    createdProduct: data.name
                })
				window.setTimeout(function () {
			        window.location.href = "/admin/dashboard";
			    }, 2000)
            }
        })
    };

    const successMessage = () => {
        return (
            <div className='alert alert-success mt-3' style={{ display: createdProduct ? '' : 'none'}}>
                <h5>{createdProduct} updated successfully</h5>
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

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file" />
                </label>
            </div>
            <div className="form-group">
                <input onChange={handleChange("name")} name="name" className="form-control" placeholder="Name" value={name} />
            </div>
            <div className="form-group">
                <textarea onChange={handleChange("description")} name="photo" className="form-control" placeholder="Description" value={description} />
            </div>
            <div className="form-group">
                <input onChange={handleChange("price")} type="number" className="form-control" placeholder="Price" value={price} />
            </div>
            <div className="form-group">
                <select onChange={handleChange("category")} className="form-control" placeholder="Category" >
                    <option>Select</option>
                    {categories && (
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))
                    )}
                </select>
            </div>
            <div className="form-group">
                <input onChange={handleChange("stock")} type="number" className="form-control" placeholder="Quantity" value={stock}/>
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Product
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
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
