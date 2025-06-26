"use server";

import { db } from "@/lib/prisma";

export async function getDoctors(speciality){
    try {
        const doctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
                speciality: speciality.split("%20").join(" "),
            },
            orderBy: {
                name: "asc",
            },
        });

        return { doctors };
    } catch(error) {
        console.error("Failed to fetch doctors by speciality: ", error);
        return { error: "Failed to fetch doctors" };
    }
}