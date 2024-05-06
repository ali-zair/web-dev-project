class CustomersFunc {
    constructor() {
        this.itemsURL = '/api/items'
        this.customersURL = '/api/customers'
        this.customerCookiesURL = '/api/customerCookies'
    }

    // async getCustomers() {
    //     const data = await fetch(this.customersURL)
    //     const customers = await data.json()
    //     return customers
    // }

    async login(usernameVal, passwordVal) {
        const customer = {
            username: usernameVal,
            password: passwordVal
        }
        const response = await fetch(this.customersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        if (response.ok) {
            const { cookie } = await response.json()
            localStorage.setItem('loginCookie', cookie)
            return cookie
        }
        return undefined
    }

    async logout(cookieVal) {
        const loginCookie = {
            cookie: cookieVal
        }
        const response = await fetch(this.customerCookiesURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCookie)
        });
        if (response.ok) {
            localStorage.setItem('loginCookie', "-1")
        }
    }

    async isLoggedIn(cookieVal) {
        const loginCookie = {
            cookie: cookieVal
        }
        const response = await fetch(this.customerCookiesURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCookie)
        });
        if (response.ok) {
            return true
        }
        return false
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

export default new CustomersFunc()