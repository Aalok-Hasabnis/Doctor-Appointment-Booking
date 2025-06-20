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
      expreience: undefined,
      url: "",
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

        <form className="space-y-6"> 
          <div className="space-y-2">
            <Label htmlFor="speciality"> Medical Speciality </Label>
            <Select>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem
                      key={spec.name}
                      value={spec.name}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center-gap-2">
                      <span className="text-emerald-400">{spec.icon}</span>
                      {spec.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
        </form>
      </CardContent>
    </Card>
    )
  }

  return <div>OnboardingPage</div>;
};

export default OnboardingPage;
