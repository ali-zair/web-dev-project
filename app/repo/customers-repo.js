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

    async login(username, password) {
        const users = await fs.readJson(this.filePath)
        const user = users.find(user => user.username == username && user.password == password)
        if (user) {
            const cookie = {
                cookie: user.id + ":" + this.generateCookie()
            }
            const cookies = await fs.readJson(this.cookiesFile)
            cookies.push(cookie)
            await fs.writeJson(this.cookiesFile, cookies)
            return cookie
        } else {
            return undefined
        }
    }

    async logout(cookie) {
        const cookies = await fs.readJson(this.cookiesFile)
        const filteredCookies = cookies.filter(c => c != cookie)
        await fs.writeJson(this.cookiesFile, filteredCookies)
        return 'logged out successfully'
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

    async purchaseItem(uid) {

    }

    async getCustomer(uid) {
        const customer = await fs.readJson(this.filePath).find(user => user.uid == uid)
        return customer
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

    async numberOfBuyersPerLocation() {

    }

}

export default new CustomersRepo()