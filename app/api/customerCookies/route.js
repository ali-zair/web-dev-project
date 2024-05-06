import customersRepo from "@/app/repo/customers-repo"

export async function POST(request) {
    try {
        const { cookie } = await request.json()
        const isLoggedIn = await customersRepo.isLoggedIn(cookie);
        if (isLoggedIn) {
            return Response.json({ cookie: cookie }, { status: 200 });
        }
        return Response.json({ message: "Invalid username or password" }, { status: 307 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { cookie } = await request.json()
        const message = await customersRepo.logout(cookie);
        return Response.json({ message: message }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}