import fs from 'fs-extra'
import path from 'path'
import customersRepo from '@/app/repo/customers-repo'

class SellersRepo {

	constructor() {
		this.filePath = path.join(process.cwd(), 'app/data/sellers.json')
		this.cookiesFile = path.join(process.cwd(), 'app/data/logged-in-sellers-cookies.json')
	}

	async getSellers() {
		const sellers = await fs.readJson(this.filePath)
		return sellers
	}

	async getSeller(id) {
		const sellers = await fs.readJson(this.filePath)
		const seller = sellers.find(cust => cust.id === id)
		return seller
	}

	async login(username, password) {
		const sellers = await fs.readJson(this.filePath)
		const seller = sellers.find(s => s.username === username && s.password === password)
		if (seller) {
			const cookie = {
				cookie: seller.id + ":" + customersRepo.generateCookie()
			}
			const cookies = await fs.readJson(this.cookiesFile)
			cookies.push(cookie)
			await fs.writeJson(this.cookiesFile, cookies)
			return cookie
		}
		return
	}

	// function to remove a cookie from the database when a seller logs out
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

	async updateSellers(seller) {
		const sellers = await this.getSellers()
		const sellerIndex = sellers.findIndex(s => s.id === seller.id)
		sellers.splice(sellerIndex, 1, seller)
		await fs.writeJson(this.filePath, sellers)
	}

	async addItemToSeller(sellerId, itemId) {
		const seller = this.getSeller(sellerId)
		seller.itemsOwned.push(itemId)
		this.updateSellers(seller)
	}

	async updateSellerBalance(itemId, amount) {
		const sellers = await fs.readJson(this.filePath)
		const sellerIndex = sellers.findIndex(s => s.itemsOwned.find(id => id === itemId))
		const seller = sellers[sellerIndex]
		seller.bankAccount.balance += amount
		sellers.splice(sellerIndex, 1, seller)
		await fs.writeJson(this.filePath, sellers)
		return seller
	}

	async addItemToSeller(itemId, sellerId) {
		const sellers = await fs.readJson(this.filePath)
		const sellerIndex = sellers.findIndex(s => s.id === sellerId)
		const seller = sellers[sellerIndex]
		seller.itemsOwned.push(itemId)
		sellers.splice(sellerIndex, 1, seller)
		await fs.writeJson(this.filePath, sellers)
		return seller
	}

}

export default new SellersRepo()