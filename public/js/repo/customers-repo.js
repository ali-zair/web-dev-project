class CustomersRepo {
    constructor() {
        this.itemsURL = 'api/items'
        this.customersURL = 'api/customers'
        this.customerCookiesURL = 'api/customerCookies'
    }

    async getCustomers() {
        const data = await fetch(this.customersURL)
        const customers = await data.json()
        return customers
    }

    async login(username, password) {
        const data = await fetch(this.customersURL)
        const customers = await data.json()
        const customer = customers.find(cust => cust.username == username && cust.password == password)
        if (customer) {
            const cookie = customer.id + ":" + this.generateCookie()
            // await fs.writeJson(this.cookiesFile, cookie)
            return cookie
        } else {
            return undefined
        }
    }

    async logout(cookie) {
        const data = await fetch(this.customerCookiesURL)
        const cookies = await data.json()
        const filteredCookies = data.filter(c => c != cookie)
        // await fs.writeJson(this.customerCookiesURL, filteredCookies)
        return 'logged out successfully'
    }

    async isLoggedIn(cookie) {
        const data = await fetch(this.customerCookiesURL)
        const cookies = await data.json()
        return cookies.includes(cookie)
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

    async purchaseItem(id) {

    }

    async getCustomer(id) {
        const data = await fetch(this.customersURL)
        const customers = data.json()
        const customer = customers.find(cust => cust.id === id)
        return customer
    }

    // async deleteCustomer(id) {
    //     const users = await fs.readJson(this.filePath)
    //     const filteredUsers = items.filter(user => user.uid != uid)
    //     await fs.writeJson(this.filePath, filteredUsers)
    //     return 'user deleted successfully'
    // }

    async totalAmountSpentPerProduct(id) {
        const data = await fetch(this.customersURL)
        const customers = data.json()
        const customer = customer.find(cust => cust.id === id)
        return customer.totalSpent / customer.itemsPurchased.length
    }

    async numberOfBuyersPerLocation() {

    }
    
}

export default new CustomersRepo()