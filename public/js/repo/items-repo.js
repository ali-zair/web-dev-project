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
        const item = await fs.readJson(this.filePath).find(item => item.id == id)
        return item
    }

    async deleteItem(id) {
        const items = await fs.readJson(this.filePath)
        const filteredItems = items.filter(item => item.id != id)
        await fs.writeJson(this.filePath, filteredItems)
        return 'item deleted successfully'
    }
}

export default new ItemsRepo()