import customersRepo from "@/app/repo/customers-repo"

export async function GET(request) {
    const users = await customersRepo.getUsers()
    return Response.json(users)
}
