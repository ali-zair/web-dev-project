import fs from 'fs-extra'
import path from 'path'

class SellersRepo {

	constructor() {
		this.filePath = path.join(process.cwd(), 'app/data/sellers.json')
	}

	async updateSellerBalance(itemId, amount) {
		const sellers = await fs.readJson(this.filePath)
		const sellerIndex = sellers.findIndex(seller => seller.itemsOwned.find(id => id === itemId))
		const seller = sellers[sellerIndex]
		seller.bankAccount.balance += amount
		sellers.splice(sellerIndex, 1, seller)
		await fs.writeJson(this.filePath, sellers)
		return seller
	}

}

export default new SellersRepo()