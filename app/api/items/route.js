import itemsRepo from "@/app/repo/items-repo"

export async function GET(request) {
    const items = await itemsRepo.getItems()
    return Response.json(items)
}
