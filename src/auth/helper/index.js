import {API} from '../../backend';


//SIGNUP helper
export const signup = user => {
	return fetch(`${API}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user),
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.error())
}


//SIGNIN helper
export const signin = user => {
	return fetch(`${API}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user),
	})
	.then(response => {
		return response.json()
	})
	.catch(error => console.error())
}


//AUTHENTICATE helper
export const authenticate = (data, next) => {
	if(typeof window !== 'undefined') {
		localStorage.setItem('jwt', JSON.stringify(data))
		next()
	}
}


//SIGNOUT helper
export const signout = next => {
	if(typeof window !== 'undefined') {
		localStorage.removeItem('jwt')
		next()

		return fetch(`${API}/signout`, {
			method: 'GET',
		})
		.then(response => console.log('Signout Success'))
		.catch(error => console.log(error))
	}
}

export const isAuthenticated = () => {
	if(typeof window == 'undefined') {
		return false
	}
	if(localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'))
	} else {
		return false
	}
}


//
