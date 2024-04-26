import customersRepo from "@/app/repo/customers-repo"

export async function GET(request) {
    const customers = await customersRepo.getCustomers()
    return Response.json(customers)
}
