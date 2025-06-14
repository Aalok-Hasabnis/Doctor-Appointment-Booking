import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async() => {
    const user = await currentUser();

    if(!user) {
        return null;
    }

    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        if(loggedInUser) {
            return loggedInUser;
        }

        const name = `${user.firstName} ${user.lastName}`;
        const newUser = await db.user.create({
            data:{
                clerkUserId:user.id,
                name, 
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                transactions: {
                    create: {
                        type: "CREDIT_PURCHASE",
                        packageId: "free_user",
                        amount: 2,
                    },
                },
            },
        });
        return newUser;
    } catch(error) {
        console.log(error.message, error);
        return null;
    }
};