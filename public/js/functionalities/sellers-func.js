class SellersFunc {
	constructor() {
		this.sellersURL = '/api/sellers'
		this.sellerCookiesURL = '/api/sellerCookies'
	}

	async login(usernameVal, passwordVal) {
		const seller = {
			username: usernameVal,
			password: passwordVal
		}
		const response = await fetch(this.sellersURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(seller)
		});
		if (response.ok) {
			const { cookie } = await response.json()
			localStorage.sellerCookie = cookie
			return cookie
		}
		return
	}

	async logout(cookieVal) {
		const sellerCookie = {
			cookie: cookieVal
		}
		const response = await fetch(this.sellerCookiesURL, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sellerCookie)
		});
		if (response.ok) {
			localStorage.sellerCookie = '-1'
		}
	}

	async isLoggedIn(cookieVal) {
		const sellerCookie = {
			cookie: cookieVal
		}
		const response = await fetch(this.sellerCookiesURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sellerCookie)
		});
		if (response.ok) {
			return true
		}
		return false
	}

	async addItem(sellerId, item) {
		const url = `/api/items?sellerId=${sellerId}`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		});
		if (response.ok) {
			return "item added successfully"
		}
		return "item could not be added"
	}

	async getSellerItems(sellerId) {
		const itemsData = await fetch('/api/items')
		let items = await itemsData.json()
		const url = `/api/sellers?sellerId=${sellerId}`
		const response = await fetch(url);
		if (response.ok) {
			const itemsOwned = await response.json()
			items = items.filter(item => itemsOwned.includes(item.id))
			return items
		}
		return null
	}

}

export default new SellersFunc()