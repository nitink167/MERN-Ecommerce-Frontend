import { API } from '../../backend';


//
//
//
//-----------------------CATEGORY CALLS------------------------//
//
//
//


//Create Category
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//Get all categories
export const getAllCategories = () => {
	return fetch(`${API}/categories`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//Get a category
export const getSingleCategory = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}


//Update a category
export const updateCategory = (categoryId, userId, token, category) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//Delete a category
export const deleteCategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//
//
//
//----------------------PRODUCT CALLS----------------------//
//
//
//

//Create a product
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: product
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))

}

//Get All Products
export const getAllProducts = () => {
	return fetch(`${API}/products`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}


//Get a product
export const getSingleProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//Update a product
export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: product
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}

//Delete a product
export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.log(error))
}
