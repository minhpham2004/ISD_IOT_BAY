"use server"

import { db } from "@/lib/db"

export const findUserIdByName =async (username: string) => {
    const res = await db.user.findUnique({
        where: {
            username
        }
    })

    if(res) return res.id
}