class CustomersRepo {
    constructor() {
        this.itemsURL = 'api/items'
        this.customersURL = 'api/customers'
        this.customerCookiesURL = 'api/customerCookies'
    }

    // async getCustomers() {
    //     const data = await fetch(this.customersURL)
    //     const customers = await data.json()
    //     return customers
    // }

    async login(username, password) {
        const customer = {
            username: username,
            password: password
        }
        const response = await fetch(this.customersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        if (response.ok) {
            const cookie = await response.text()
            return cookie
        }
        return undefined
    }

    async logout(cookie) {
        const data = await fetch(this.customerCookiesURL)
        const cookies = await data.json()
        const filteredCookies = data.filter(c => c != cookie)
        return 'logged out successfully'
    }

    async isLoggedIn(cookie) {
        const loginCookie = {
            cookie: cookie        
        }
        const response = await fetch(this.customerCookiesURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCookie)
        });
        if (response.ok) {
            const cookie = await response.text()
            return cookie
        }
        return undefined
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