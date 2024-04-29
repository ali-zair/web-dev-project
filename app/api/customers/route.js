import customersRepo from "@/app/repo/customers-repo"

// export async function GET(request) {
//     const customers = await customersRepo.getCustomers()
//     return Response.json(customers)
// }

export async function POST(request) {
    const { username, password } = await request.json()
    try {
        const cookie = await customersRepo.login(username, password);
        if (cookie) {
            return Response.json({ cookie: cookie }, { status: 200 });
        } else {
            return Response.json({ message: "Invalid username or password"}, {status: 401})
        }
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}