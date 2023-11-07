import DashBoard from "@/components/DashBoard"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server"
import { redirect } from "next/navigation"


const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    const dbUser = db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=dashboard')

    return (
        <DashBoard />
    )
}

export default Page