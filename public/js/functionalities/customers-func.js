class CustomersFunc {
	constructor() {
		this.customersURL = '/api/customers'
		this.customerCookiesURL = '/api/customerCookies'
	}

	async login(usernameVal, passwordVal) {
		const customer = {
			username: usernameVal,
			password: passwordVal
		}
		const response = await fetch(this.customersURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(customer)
		});
		if (response.ok) {
			const { cookie } = await response.json()
			localStorage.setItem('loginCookie', cookie)
			return cookie
		}
		return
	}

	async logout(cookieVal) {
		const loginCookie = {
			cookie: cookieVal
		}
		const response = await fetch(this.customerCookiesURL, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginCookie)
		});
		if (response.ok) {
			localStorage.setItem('loginCookie', "-1")
		}
	}

	async isLoggedIn(cookieVal) {
		const loginCookie = {
			cookie: cookieVal
		}
		const response = await fetch(this.customerCookiesURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginCookie)
		});
		if (response.ok) {
			return true
		}
		return false
	}

	async purchaseItem(custId, itemId, quantity, purchaseDetails) {
		const url = `${this.customersURL}?custId=${custId}&itemId=${itemId}&quantity=${quantity}`
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(purchaseDetails)
		});
		const { message } = await response.json()
		return message
	}

	async getCustomer(id) {
		const url = `${this.customersURL}?id=${id}`
		const data = await fetch(url)
		const customer = data.json()
		return customer
	}
}

export default new CustomersFunc()