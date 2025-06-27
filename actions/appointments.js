import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { deductCreditsForAppointment } from "./credits";
import { revalidatePath } from "next/cache";
import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";

const credentials = new Auth({
    applicationId:process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
    privateKey:process.env.VONAGE_PRIVATE_KEY,
});

const vonage = new Vonage(credentials, {});

export async function getDoctorById(doctorId) {
    try {
        const doctor = await db.user.findUnique ({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });

        if(!doctor) {
            throw new Error("Doctor not Found");
        }
        return { doctor }; 

    } catch(error) {
        throw new Error("Failed to fetch Doctor details");
    }
}

export async function getAvailableTimeSlots(doctorId) {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });

        if(!doctor) {
            throw new Error("Doctor not found or not verified");
        }

        const availability = await db.availability.findFirst({
            where: {
                doctorId: doctor.id,
                status: "AVAILABLE",
            },
        });

        if(!availability) {
            throw new Error("Availabilty not set by doctor");
        }

        const now = new Date();
        const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];

        const lastDay = endOfDay(days[3]);
        const existingAppointments = await db.appointment.findMany({
        where: {
            doctorId: doctor.id,
            status: "SCHEDULED",
            startTime: {
            lte: lastDay,
            },
        },
        });

        const availableSlotsByDays = {};

        for (const day of days) {
        const dayString = format(day, "yyyy-MM-dd");
        availableSlotsByDays[dayString] = [];

        const availabilityStart = new Date(availability.startTime);
        const availabilityEnd = new Date(availability.endTime);

        availabilityStart.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
        availabilityEnd.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());

        let current = new Date(availabilityStart);
        const end = new Date(availabilityEnd);

        while (isBefore(addMinutes(current, 30), end) || +addMinutes(current, 30) === +end) {
            const next = addMinutes(current, 30);

            if (isBefore(current, now)) {
            current = next;
            continue;
            }

            const overlaps = existingAppointments.some((appointment) => {
            const aStart = new Date(appointment.startTime);
            const aEnd = new Date(appointment.endTime);

            return (
                (current >= aStart && current < aEnd) ||
                (next > aStart && next <= aEnd) ||
                (current <= aStart && next >= aEnd)
            );
            });

            if (!overlaps) {
            availableSlotsByDays[dayString].push({
                startTime: current.toISOString(),
                endTime: next.toISOString(),
                formatted: `${format(current, "h:mm a")} - ${format(next, "h:mm a")}`,
                day: format(current, "EEEE, MMMM d"),
            });
            }

            current = next;
        }
        }

        const result = Object.entries(availableSlotsByDays).map(([date, slots]) => ({
        date,
        display: slots.length > 0 ? slots[0].day : format(new Date(date), "EEEE, MMMM d"),
        slots,
        }));

        return {days: result};
    } catch(error) {
        throw new Error("Failed to fetch doctor details");
    }
}

export async function bookAppointment(formData) {

    const { userId } = await auth();

    if(!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const patient = await db.user.getUnique({
            where: {
                clerkUserId: userId,
                role: "PATIENT",

            }, 
        });

        if(!patient) {
            throw new Error("Patient Not Found");
        }

        const doctorId = formData.get("doctorId");
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");
        const patientDescription = formData.get("description") || null;

        if(!doctorId || !startTime || !endTime) {
            throw new Error("Doctor, Start Time, End Time are required");
        }

        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });


        if(!doctor) {
            throw new Error("Doctor Not Found or not Verified");
        }

        if(patient.credits < 2) {
            throw new Error("Insufficient Credits to book an appointment"); 
        }

        const overlapppingAppointment = await db.appointment.findUnique({
            where: {
                status: "SCHEDULE",
                OR: [
                    {
                        startTime: {
                            lte: startTime,
                        },
                        endTime: {
                            gt: startTime,
                        },
                    },
                    {
                        startTime: {
                            lt: endTime,
                        },
                        endTime: {
                            gte: endTime,
                        }
                    },
                    {
                        startTime: {
                            gte: startTime,
                        },
                        endTime: {
                            lte: endTime,
                        },
                    },
                ],
            },
        });

        if(overlapppingAppointment) {
            throw new Error("This slot is already booked");
        }

        const sessionId = await createVideoSession();

        
            const { success, error } = await deductCreditsForAppointment(
                patient.id, 
                doctor.id
            );

            if(!success) {
                throw new Error(error || "Failed to deduct Credits");
            }

            const appointment = await tx.appointment.create({
                data: {
                    patientId: patient.id,
                    doctorId: doctor.id,
                    startTime, 
                    endTime,
                    patientDescription,
                    status: "SCHEDULING",
                    videoSessionId: sessionId,
                },
            });


        revalidatePath("/appointments");
        return { success: true, appointment: appointment};

    } catch(error) {
        throw new Error("Failed to Fetch Doctor Details");
    }
}

async function createVideoSession() {
    try {    
        const session = await vonage.video.createSession({mediaMode: "routed"});
        return session.sessionId;
    } catch(error) {
        throw new Error("Failed to Create Video Session" + error.message);
    }
}