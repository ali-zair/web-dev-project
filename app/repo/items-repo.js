import fs from 'fs-extra'
import path from 'path'
import sellersRepo from '@/app/repo/sellers-repo'

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
		const itemIndex = items.findIndex(i => i.id === item.id)
		if (itemIndex === -1) {
			const itemId = Math.floor(Math.random() * 1000)
			item.id = itemId
			items.push(item)
			await fs.writeJson(this.filePath, items)
			await sellersRepo.addItemToSeller(sellerId, itemId)
			return { result: 'item created successfully', itemId: itemId }
		}
		return { result: 'item already exists' }
	}

}

export default new ItemsRepo()