"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setAvailabilitySlots(formData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Get the doctor
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Get form data
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    const date = formData.get("date");

    console.log("Server action received:", { startTime, endTime, date }); // DEBUG

    // Validate input
    if (!startTime || !endTime) {
      return { success: false, error: "Start time and end time are required" };
    }

    // Create proper datetime objects
    let startDateTime, endDateTime;
    
    if (date) {
      // Combine date with time
      startDateTime = new Date(`${date}T${startTime}:00`);
      endDateTime = new Date(`${date}T${endTime}:00`);
    } else {
      // Use today's date if no date provided
      const today = new Date().toISOString().split('T')[0];
      startDateTime = new Date(`${today}T${startTime}:00`);
      endDateTime = new Date(`${today}T${endTime}:00`);
    }

    console.log("Created date objects:", { startDateTime, endDateTime }); // DEBUG

    if (startDateTime >= endDateTime) {
      return { success: false, error: "Start time must be before end time" };
    }

    // Check for overlapping slots - SIMPLIFIED VERSION
    const overlappingSlots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
        OR: [
          // New slot starts during existing slot
          {
            AND: [
              { startTime: { lte: startDateTime } },
              { endTime: { gt: startDateTime } }
            ]
          },
          // New slot ends during existing slot
          {
            AND: [
              { startTime: { lt: endDateTime } },
              { endTime: { gte: endDateTime } }
            ]
          },
          // New slot completely contains existing slot
          {
            AND: [
              { startTime: { gte: startDateTime } },
              { endTime: { lte: endDateTime } }
            ]
          },
          // Existing slot completely contains new slot
          {
            AND: [
              { startTime: { lte: startDateTime } },
              { endTime: { gte: endDateTime } }
            ]
          }
        ],
      },
    });

    console.log("Found overlapping slots:", overlappingSlots.length); // DEBUG

    // For now, let's delete any overlapping slots (you can modify this logic later)
    if (overlappingSlots.length > 0) {
      await db.availability.deleteMany({
        where: {
          id: {
            in: overlappingSlots.map((slot) => slot.id),
          },
        },
      });
      console.log("Deleted overlapping slots"); // DEBUG
    }

    // Create new availability slot
    const newSlot = await db.availability.create({
      data: {
        doctorId: doctor.id,
        startTime: startDateTime,
        endTime: endDateTime,
        status: "AVAILABLE",
      },
    });

    console.log("Created new slot:", newSlot); // DEBUG

    revalidatePath("/doctor");
    return { success: true, slot: newSlot };
    
  } catch (error) {
    console.error("Failed to set availability slots:", error);
    return { 
      success: false, 
      error: "Failed to set availability: " + error.message 
    };
  }
}

export async function getDoctorAvailability() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const availabilitySlots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { slots: availabilitySlots };
  } catch (error) {
    throw new Error("Failed to fetch availability slots " + error.message);
  }
}

export async function getDoctorAppointments() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: {
          in: ["SCHEDULED"],
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { appointments };
  } catch (error) {
    throw new Error("Failed to fetch appointments " + error.message);
  }
}