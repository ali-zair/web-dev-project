import fs from 'fs-extra'
import path from 'path'

class UsersRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), 'app/data/users.json')
        this.cookiesFile = path.join(process.cwd(), 'app/data/logged-in-users-cookies.json')
    }

    async getUsers() {
        const users = await fs.readJson(this.filePath)
        return users
    }

    async login(username, password) {
        const users = await fs.readJson(this.filePath)
        const user = users.find(user => user.username == username && user.password == password)
        if (user) {
            const cookie = this.generateCookie()
            await fs.writeJson(this.cookiesFile, cookie)
            return true
        } else {
            return false
        }
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

    async purchaseItem(uid) {

    }

    async logout(cookie) {
        const cookies = await fs.readJson(this.cookiesFile)
        const filteredCookies = cookies.filter(c => c != cookie)
        await fs.writeJson(this.cookiesFile, filteredCookies)
        return 'logged out successfully'
    }

    async getUser(uid) {
        const user = await fs.readJson(this.filePath).find(user => user.uid == uid)
        return user
    }

    async deleteUser(uid) {
        const users = await fs.readJson(this.filePath)
        const filteredUsers = items.filter(user => user.uid != uid)
        await fs.writeJson(this.filePath, filteredUsers)
        return 'user deleted successfully'
    }

    async totalAmountSpentPerProduct(uid) {
        const users = await fs.readJson(this.filePath)
        const user = users.find(user => user.uid == uid)
        return user.totalSpent / user.itemsPurchased.length
    }

    async numberOfBuyersPerLocation() {}
    
}

export default new UsersRepo()