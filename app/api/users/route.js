import usersRepo from "@/app/repo/users-repo"

export async function GET(request) {
    const users = await usersRepo.getUsers()
    return Response.json(users)
}
