import itemsRepo from "@/app/repo/items-repo"

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    const items = await itemsRepo.getItem(id)
    return Response.json(items)
}