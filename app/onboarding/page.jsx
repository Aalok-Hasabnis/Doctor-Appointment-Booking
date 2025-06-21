"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Stethoscope, User } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SPECIALTIES } from "@/lib/specialities"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const doctorFormSchema = z.object({
  speciality: z.string().min(1, "Speciality is required"),
  experience: z
    .number()
    .min(5, "Experience must be atleast 5 years")
    .max(70, "Experience must be less than 70 years"),
  credentialUrl: z
    .string()
    .url("Please enter valid URL")
    .min(1, "Credential URL is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters")
});

const OnboardingPage = () => {
  
  const [step, setStep] = useState("choose-role");
  const router = useRouter();

  const {data, fn: submitUserRole, loading } = useFetch(setUserRole);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      speciality: "",
      experience: undefined, 
      credentialUrl: "",
      description: "",
    }
  });

  const specialityValue = watch("speciality");
  
  const handlePatientSelection = async() => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

  useEffect(() => {
    
    if(data && data.success){
        toast.success("Role Selected");
      router.push(data.redirect);
    }
  },[data])

  const onDoctorSubmit = async(data)=> {
    if(loading) return;
        
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("speciality", data.speciality);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);

    await submitUserRole(formData);
  };

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        {/* Patient Card - Left */}
        <Card 
        onClick={()=> !loading && handlePatientSelection()}
        className='border border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all h-full'>
          <CardContent className='pt-6 pb-6 flex flex-col items-center text-center h-full'>
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">Join as a Patient</CardTitle>
            <CardDescription className="mb-4 text-muted-foreground flex-1">
              Instantly book appointments with certified doctors and manage your health seamlessly.
            </CardDescription>
            <Button className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
                </>
              ) : (
                "Continue as a Patient"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Doctor Card - Right */}
        <Card
        onClick={() => !loading && setStep("doctor-form")} 
        className='border border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all h-full'>
          <CardContent className='pt-6 pb-6 flex flex-col items-center text-center h-full'>
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">Join as a Doctor</CardTitle>
            <CardDescription className="mb-4 text-muted-foreground flex-1">
              Become a verified provider, reach more patients, and grow your online presence with MediConnect.
            </CardDescription>
            <Button disabled={loading}
            className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700">
              Continue as a Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "doctor-form") {
    return (
    <Card className='border-emerald-900/20'>
      <CardContent className='pt-6'>
        <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-white mb-2">Complete your Doctors Profile</CardTitle>
            <CardDescription>
              Please provide your professional details and verification
            </CardDescription>
        </div>

        <form className="space-y-6 bg-muted/20 p-6 md:p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
          onSubmit={handleSubmit(onDoctorSubmit)}
        >
          {/* Speciality */}
          <div className="space-y-2">
            <Label htmlFor="speciality" className="text-sm font-medium text-white">
              Medical Speciality
            </Label>
            <Select 
              value={specialityValue} 
              onValueChange={(value) => {
                setValue("speciality", value);
                // Trigger validation
                setValue("speciality", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger
                id="speciality"
                className="w-full bg-background border border-emerald-700/30 text-white focus:ring-2 focus:ring-emerald-500 rounded-md"
              >
                <SelectValue placeholder="Select your specialty" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-emerald-700/30 text-white shadow-lg">
                {SPECIALTIES.map((spec) => (
                  <SelectItem
                    key={spec.name}
                    value={spec.name}
                    className="cursor-pointer hover:bg-emerald-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">{spec.icon}</span>
                      {spec.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.speciality && (
              <p className="text-sm text-red-500">{errors.speciality.message}</p>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium text-white">
              Years of Experience
            </Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 5"
              className="bg-background border border-emerald-700/30 text-white"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>

          {/* Credential */}
          <div className="space-y-2">
            <Label htmlFor="credentialUrl" className="text-sm font-medium text-white">
              Link to Credential Document
            </Label>
            <Input
              id="credentialUrl"
              type="url"
              placeholder="https://example.com/my-degree.pdf"
              className="bg-background border border-emerald-700/30 text-white"
              {...register("credentialUrl")}
            />
            {errors.credentialUrl && (
              <p className="text-sm text-red-500">{errors.credentialUrl.message}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Please provide a link to your medical degree or certification.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-white">
              Description of Your Services
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your expertise, services, and approach to patient care."
              rows={4}
              className="bg-background border border-emerald-700/30 text-white"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choose-role")}
              className="border-emerald-900/30 w-full sm:w-auto"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for verification"
              )}
            </Button>
          </div>
        </form>

      </CardContent>
    </Card>
    )
  }

  return <div>OnboardingPage</div>;
};

export default OnboardingPage;