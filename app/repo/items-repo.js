import fs from 'fs-extra'
import path from 'path'
// import sellersRepo from '@/app/repo/sellers-repo'
import sellersRepo from './sellers-repo.js'

class ItemsRepo {

	constructor() {
		this.filePath = path.join(process.cwd(), 'app/data/items.json')
	}

	async getItems() {
		const items = await fs.readJson(this.filePath)
		return items
	}

	async getItem(id) {
		const items = await fs.readJson(this.filePath)
		const item = items.find(item => item.id === id)
		return item
	}

	async updateItem(itemId, item) {
		const items = await fs.readJson(this.filePath)
		const itemIndex = items.findIndex(item => item.id === itemId)
		if (items[itemIndex]) {
			items.splice(itemIndex, 1, item)
			await fs.writeJson(this.filePath, items)
		} else {
			return 'item not found'
		}
		return 'item updated successfully'
	}

	async createItem(sellerId, item) {
		const items = await fs.readJson(this.filePath)
		const itemIndex = items.findIndex(i => i.title.toLowerCase() === item.title.toLowerCase())
		if (itemIndex === -1) {
			const id = Math.floor(Math.random() * 1000000000)
			items.push({ id, ...item })
			await fs.writeJson(this.filePath, items)
			await sellersRepo.addItemToSeller(sellerId, id)
			return { result: 'item created successfully', itemId: id }
		}
		return { result: 'item already exists' }
	}

}

export default new ItemsRepo()