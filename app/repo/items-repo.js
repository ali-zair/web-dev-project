import fs from 'fs-extra'
import path from 'path'

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
}

export default new ItemsRepo()