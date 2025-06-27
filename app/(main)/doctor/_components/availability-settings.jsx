"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function AvailabilitySettings({ slots }) {
  const [showForm, setShowForm] = useState(false);

  const { loading, fn: submitSlots, data, error } = useFetch(setAvailabilitySlots);

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  // Handle slot submission
  const onSubmit = async (formData) => {
    console.log("Form submitted with data:", formData);
    
    if (loading) {
      console.log("Already loading, returning...");
      return;
    }

    // Validate times
    if (formData.startTime >= formData.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    // Create FormData object
    const submitData = new FormData();
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    
    // Append data to FormData
    submitData.append("startTime", formData.startTime);
    submitData.append("endTime", formData.endTime);
    submitData.append("date", today); // Add today's date
    
    console.log("Submitting data:", {
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: today
    });

    try {
      await submitSlots(submitData);
    } catch (err) {
      console.error("Error in submitSlots:", err);
      toast.error("Failed to save availability");
    }
  };

  useEffect(() => {
    console.log("useEffect triggered - data:", data, "error:", error);
    
    if (data && data?.success) {
      setShowForm(false);
      reset();
      toast.success("Availability slots updated successfully");
      // Optionally refresh the page to show new slots
      window.location.reload();
    } else if (data && !data?.success) {
      console.log("Server returned unsuccessful response:", data);
      toast.error(data?.error || "Failed to save availability");
    } else if (error) {
      console.error("Error from useFetch:", error);
      toast.error("An error occurred while saving");
    }
  }, [data, error, reset]);

  // Format time string for display
  const formatTimeString = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "Invalid time";
    }
  };

  return (
    <Card className="border-emerald-900/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Clock className="h-5 w-5 mr-2 text-emerald-400" />
          Availability Settings
        </CardTitle>
        <CardDescription>
          Set your daily availability for patient appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Availability Display */}
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Current Availability
              </h3>

              {slots.length === 0 ? (
                <p className="text-muted-foreground">
                  You haven&apos;t set any availability slots yet. Add your
                  availability to start accepting appointments.
                </p>
              ) : (
                <div className="space-y-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center p-3 rounded-md bg-muted/20 border border-emerald-900/20"
                    >
                      <div className="bg-emerald-900/20 p-2 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {formatTimeString(slot.startTime)} -{" "}
                          {formatTimeString(slot.endTime)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.appointment ? "Booked" : "Available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Availability Time
            </Button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border border-emerald-900/20 rounded-md p-4"
          >
            <h3 className="text-lg font-medium text-white mb-2">
              Set Daily Availability
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                  className="bg-background border-emerald-900/20"
                />
                {errors.startTime && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime", { required: "End time is required" })}
                  className="bg-background border-emerald-900/20"
                />
                {errors.endTime && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="border-emerald-900/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Availability"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 p-4 bg-muted/10 border border-emerald-900/10 rounded-md">
          <h4 className="font-medium text-white mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-emerald-400" />
            How Availability Works
          </h4>
          <p className="text-muted-foreground text-sm">
            Setting your daily availability allows patients to book appointments
            during those hours. The same availability applies to all days. You
            can update your availability at any time, but existing booked
            appointments will not be affected.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default AvailabilitySettings;