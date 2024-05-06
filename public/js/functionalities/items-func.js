class ItemsFunc {
	constructor() {
		this.itemsURL = '/api/items'
	}

	async getItems() {
		const items = await fs.readJson(this.filePath)
		return items
	}

	async getItem(id) {
		const item = await fs.readJson(this.filePath).find(item => item.id == id)
		return item
	}

	async updateItem(itemID, item) {
		const url = `${this.itemsURL}/${itemID}`
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		});
		if (response.ok) {
			return 'item updated successfully'
		}
		return 'item could not be updated'
	}
}

export default new ItemsFunc()