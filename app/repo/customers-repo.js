import itemsRepo from './items-repo.js'
import sellersRepo from './sellers-repo.js'
import fs from 'fs-extra'
import path from 'path'

class CustomersRepo {

	constructor() {
		this.filePath = path.join(process.cwd(), 'app/data/customers.json')
		this.cookiesFile = path.join(process.cwd(), 'app/data/logged-in-customers-cookies.json')
	}

	async getCustomers() {
		const customers = await fs.readJson(this.filePath)
		return customers
	}

	async getCustomer(id) {
		const customers = await fs.readJson(this.filePath)
		const customer = customers.find(cust => cust.id === id)
		return customer
	}

	async login(username, password) {
		const customers = await fs.readJson(this.filePath)
		const customer = customers.find(c => c.username === username && c.password === password)
		if (customer) {
			const cookie = {
				cookie: customer.id + ":" + this.generateCookie()
			}
			const cookies = await fs.readJson(this.cookiesFile)
			cookies.push(cookie)
			await fs.writeJson(this.cookiesFile, cookies)
			return cookie
		}
		return
	}

	// function to remove a cookie from the database when a user logs out
	async logout(cookie) {
		const cookies = await fs.readJson(this.cookiesFile)
		const cookieFound = cookies.find(c => c.cookie === cookie)
		if (cookieFound) {
			const filteredCookies = cookies.filter(c => c.cookie !== cookie)
			await fs.writeJson(this.cookiesFile, filteredCookies)
			return 'logged out successfully'
		}
		return 'the server was unable to log you out'
	}

	async isLoggedIn(cookie) {
		const cookies = await fs.readJson(this.cookiesFile);
		return cookies.find(c => c.cookie === cookie);
	}

	generateCookie() {
		let cookie = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 60; i++) {
			cookie += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return cookie;
	}

	async updateCustomers(customer) {
		const customers = await this.getCustomers()
		const customerIndex = customers.findIndex(cust => cust.id === customer.id)
		customers.splice(customerIndex, 1, customer)
		await fs.writeJson(this.filePath, customers)
	}

	async getPurchases(custId) {
		const customer = await this.getCustomer(custId)
		return customer.itemsPurchased
	}

	async purchaseItem(custId, itemId, quantity, purchaseDetails) {
		const customer = await this.getCustomer(custId)
		const item = await itemsRepo.getItem(itemId)
		if (customer.balance >= (item.price * quantity)) {
			if (item.quantity >= quantity) {
				// decreasing the quantity of the item
				item.quantity -= quantity
				itemsRepo.updateItem(itemId, item)
				// calculating the total amount of the purchase
				const amount = item.price * quantity
				// reducing the amount from the balance of the customer
				customer.balance -= amount
				// adding the purchase details object to the customer
				customer.itemsPurchased.push(purchaseDetails)
				await this.updateCustomers(customer)
				// updating the sellers balance
				sellersRepo.updateSellerBalance(itemId, amount)
				return 'item updated successfully'
			}
			return 'not enough stock for this item'
		}
		return 'customer has insufficient balance'
	}

}

export default new CustomersRepo()